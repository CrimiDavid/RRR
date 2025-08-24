import express from 'express';
import { connectDB } from './data/db.js';
import mongoose from 'mongoose';
import User from "./schemas/user.js";
import cors from "cors";
const app = express();
const port = 8000;

await connectDB();
app.use(cors());
app.get('/', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const names = collections.map(c => c.name);
        res.json({ collections: names });
    } catch (err) {
        console.error("Error listing collections:", err);
        res.status(500).json({ error: "Failed to fetch collections" });
    }
});

app.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, "name fame").sort({fame: -1});
        res.json({ success: true, users });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
