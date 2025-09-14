import express from "express";
import Post from "../../schemas/posts_schema.js";
import { queryValidator } from "../../utils/posts/query-validator.js";
import { Session } from "../../utils/users/get-session.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import dotenv from "dotenv";

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
router.post("/create", upload.single("file"), async (req, res) => {
  const { name, description, type } = req.body;
  const creator = await Session(req);
  const file = req.file;
  console.log(file);
  console.log(creator);
  try {
    const key = `${creator}/${file.originalname}`;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const s3Object = `s3://${process.env.S3_BUCKET}/${key}`;
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
