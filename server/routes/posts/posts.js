import express from "express"
import Post from "../../schemas/posts_schema.js";
const router = express.Router()


router.get("/create", async (req, res) => {
    try {
        const post = await Post.create({
            name: "useState",
            description: "This is component allows you to use state local",
            type: "HOOK",
            creator: "68aa81e9c4e58c7038a9de40" // reference to the User _id
        });

        res.json(post);
    }catch (e) {
        res.status(500).json({ error: e.message });
    }
})

router.get("/all", async (req, res) => {
    try {
        const { sort = "likes", order = "desc", filter = "" } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const start = (page - 1) * limit;

        const sortOrder = order === "asc" ? 1 : -1;
        const allowedSortFields = ["likes"];
        const safeSort = allowedSortFields.includes(sort) ? sort : "likes";
        const safeFilter = ["UI", "HOOK"].includes(filter) ? filter : null;

        // 👇 build query dynamically
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
