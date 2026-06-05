import { RequestHandler } from "express";
import crypto from "crypto";

export const handleUpload: RequestHandler = (req, res) => {
  const { filename, size } = req.body;

  // Simulate file analysis and page counting based on size or generic random number
  const pages = Math.max(3, Math.min(15, Math.ceil((size || 5000) / 1000)));

  console.log(`[Upload] File received: ${filename || "unknown"}, Size: ${size || 0} bytes. Generated pages: ${pages}`);

  res.status(200).json({
    id: crypto.randomUUID(),
    pages,
  });
};

export const handleNarrate: RequestHandler = (req, res) => {
  const { id, text } = req.body;

  if (!id || !text) {
    res.status(400).json({ error: "Missing document id or narration text" });
    return;
  }

  console.log(`[Narration] Synthesizing speech for document ${id}. Text snippet: "${text.substring(0, 40)}..."`);

  // Return success
  res.status(200).json({ success: true });
};
