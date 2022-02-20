import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());
const port = 8080;

app.get("/", (_req, res) => {
  res.json({
    message: "안녕 아리스!",
    version: "0.0.2",
  });
});

app.get("/restart", (req, res, next) => {
  const { key } = req.query as { key: string };
  if (key !== process.env.WEBHOOK_KEY) {
    next(new Error("invalid key"));
    return;
  }
  console.log("restarting...");
  res.json({
    status: "server restarted",
  });
  spawn("pm2", ["reload", "AL-1S"]).on("error", (err) => {
    {
      console.error("spawn error", err);
    }
  });
});

// error 처리 로직
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`AL-1S is on listening on ${port}`);
});
