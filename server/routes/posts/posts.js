import express from "express";
import Post from "../../schemas/posts_schema.js";
import User from "../../schemas/user.js";
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

router.get("/:creator/:name", async (req, res) => {
  try {
    const { creator, name } = req.params;
    console.log(name);
    const post = await Post.findOne(
      {
        creator: new mongoose.Types.ObjectId(creator),
        name,
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
      .populate("creator", "name")
      .sort({ [safeSort]: sortOrder })
      .skip(start)
      .limit(limit);
    res.json({ posts, pages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/favorite/:creator/:post", async (req, res) => {
  try {
    const userId = await Session(req);
    const { creator, post } = req.params;
    const postId = creator + post;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isFavorited = user.favorites.includes(postId);

    if (isFavorited) {
      res.json({ status: true });
    }
    res.json({ status: false });
  } catch (e) {
    res.send(e);
  }
});
router.post("/favorite", async (req, res) => {
  try {
    const userId = await Session(req);
    const { creator, post } = req.body;
    const postId = creator + post;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if post is already in favorites
    const isFavorited = user.favorites.includes(postId);

    if (isFavorited) {
      // Remove from favorites
      user.favorites = user.favorites.filter((id) => id !== postId);
      await user.save();
      res.json({ favorited: false, message: "Post removed from favorites" });
    } else {
      // Add to favorites
      user.favorites.push(postId);
      await user.save();
      res.json({ favorited: true, message: "Post added to favorites" });
    }
  } catch (e) {
    console.error("Favorite error:", e);
    res.status(500).json({ error: e.message });
  }
});
export default router;
