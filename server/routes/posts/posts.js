import express from "express";
import Post from "../../schemas/posts_schema.js";
import { queryValidator } from "../../utils/posts/query-validator.js";
import { Session } from "../../utils/users/get-session.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.AWS_REGION;
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

router.post("/create", upload.array("files"), async (req, res) => {
  const { name, description, type } = req.body;
  const creator = await Session(req);
  const files = req.files;

  const dir = `${creator}/${name}`;
  try {
    const uploadedKeys = await Promise.all(
      files.map(async (file) => {
        const key = `${dir}/${file.originalname}`;
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);
        return key;
      })
    );

    const s3Object = uploadedKeys.map((key) => key);

    const post = await Post.create({
      name,
      description,
      type,
      creator,
      s3Object,
    });

    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:creator", async (req, res) => {
  try {
    const { creator } = req.params;

    const post = await Post.findOne(
      {
        _id: new mongoose.Types.ObjectId(creator),
      },
      "s3Object"
    );
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const keys = post.s3Object;

    const result = await Promise.all(
      keys.map(async (key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
        });

        return await getSignedUrl(s3, command, 3600);
      })
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const { sort = "likes", order = "desc", filter = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const start = (page - 1) * limit;

    const sortOrder = order === "asc" ? 1 : -1;

    // validate fields
    const safeSort = queryValidator(sort, "likes", ["likes"]);
    const safeFilter = queryValidator(filter, null, ["UI", "HOOK"]);

    const query = {};
    if (safeFilter) {
      query.type = safeFilter;
    }

    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate("creator", "name -_id")
      .sort({ [safeSort]: sortOrder })
      .skip(start)
      .limit(limit);

    res.json({ posts, pages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
