import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/proxy.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  // Convert headers to a plain object, excluding certain ones
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (value && typeof value === "string" && key.toLowerCase() !== "host") {
      headers[key] = value;
    }
  }

  try {
    const response = await fetch(
      "https://sr-portal-graphql-api.vercel.app/api/graphql",
      {
        method,
        headers,
        body: method !== "GET" ? body : undefined,
      }
    );

    const responseData = await response.text();

    // Copy the Set-Cookie header if present
    if (response.headers.has("set-cookie")) {
      res.setHeader("Set-Cookie", response.headers.get("set-cookie")!);
    }

    res.status(response.status).send(responseData);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
