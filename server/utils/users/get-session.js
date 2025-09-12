// lib/session.ts
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";

export async function Session(req) {
  const { user } = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return user?.id ?? null;
}
