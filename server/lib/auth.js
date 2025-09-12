import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGODB_URI);
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      fame: {
        type: "number",
        required: false,
        defaultValue: 0,
        input: false,
      },
    },
  },
});
