import express from "express";
import Post from "../../schemas/posts_schema.js";
import { queryValidator } from "../../utils/posts/query-validator.js";
import { Session } from "../../utils/users/get-session.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, description, type } = req.body;
  const creator = await Session(req);
  console.log(creator);
  try {
    const post = await Post.create({
      name,
      description,
      type,
      creator,
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
