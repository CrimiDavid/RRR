import express from "express";
import { connectDB } from "./data/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { Session } from "./utils/users/get-session.js";
dotenv.config();
//route imports
import discoverRoute from "./routes/discover/discover.js";
import postsRoute from "./routes/posts/posts.js";
//config
const app = express();
const port = 8000;
await connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

//middleware

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
//routes
app.use("/discover", discoverRoute);
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
