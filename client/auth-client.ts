import { createAuthClient } from "better-auth/client";
import { nextCookies } from "better-auth/next-js";

const authClient = createAuthClient({
  baseURL: "http://localhost:8000",
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});

export const { signIn, signUp, useSession } = authClient;
