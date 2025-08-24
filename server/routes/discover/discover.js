import express from "express";
import mongoose from "mongoose";
import User from "../../schemas/user.js";

const router = express.Router();



router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, "name fame").sort({fame: -1});
        res.json({ success: true, users });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


export default router;