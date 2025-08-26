import express from 'express';
import { connectDB } from './data/db.js';
import cors from "cors";

//route imports
import discoverRoute from "./routes/discover/discover.js"
import postsRoute from "./routes/posts/posts.js"
//config
const app = express();
const port = 8000;
await connectDB();

//middleware
app.use(cors());

//routes
app.use("/discover", discoverRoute);
app.use("/posts", postsRoute)



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
