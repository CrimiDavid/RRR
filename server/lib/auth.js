import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(
  "mongodb+srv://david:Roger1825-!@cluster0.ax9h0jj.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
);
const db = client.db();
export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
});
