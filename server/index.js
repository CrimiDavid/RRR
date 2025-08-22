import express from 'express';
import { connectDB } from './data/db.js';
import mongoose from 'mongoose';
const app = express();
const port = 8000;

await connectDB(); // optional: you can call without await if not using top-level await

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


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
