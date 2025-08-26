import express from "express"
import Post from "../../schemas/posts_schema.js";
const router = express.Router()


router.get("/create", async (req, res) => {
    try {
        const post = await Post.create({
            name: "useMilk",
            description: "This is component allows you to use milk",
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
        const posts = await Post.find().populate("creator", "name -_id");

        res.json(posts);
    }catch (e) {
        res.status(500).json({ error: e.message });
    }
})

export default router;