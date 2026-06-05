import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleListMentors, handleListForum } from "./routes/bridgehub";
import { handleTranslate, handleExplain, handleRunCode } from "./routes/codetranslate";
import { handleUpload, handleNarrate } from "./routes/explainer";
import { handleContact } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // BridgeHub routes
  app.get("/api/mentors", handleListMentors);
  app.get("/api/forum", handleListForum);

  // CodeTranslate routes
  app.post("/api/code/translate", handleTranslate);
  app.post("/api/code/explain", handleExplain);
  app.post("/api/code/run", handleRunCode);

  // Explainer Bot routes
  app.post("/api/explainer/upload", handleUpload);
  app.post("/api/explainer/narrate", handleNarrate);

  // Contact route
  app.post("/api/contact", handleContact);

  return app;
}
