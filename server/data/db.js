// data/db.js
import mongoose from 'mongoose';

const uri = "mongodb+srv://david:Roger1825-!@cluster0.ax9h0jj.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
};

export async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("✅ Connected to MongoDB sample_mflix!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}
