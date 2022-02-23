import dotenv from "dotenv";
dotenv.config({
  path: `.credential.env`,
});
import express from "express";
import TelegramBotService from "./service";
import type { Request, Response, NextFunction } from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());
const port = 8080;
let isDisableKeepAlive = false;

app.use((_, res, next) => {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "안녕 아리스!",
    version: "0.0.4",
    ip: req.headers["x-forwarded-for"] || req.ip,
  });
});

app.put("/restart", (req, res) => {
  const { key } = req.body as { key: string };
  if (key !== process.env.WEBHOOK_KEY) {
    return res.status(403).json({
      message: "invalid key",
    });
  }

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
    message: err?.message ?? "",
    stack: err?.stack ?? "",
  });
});

const server = app.listen(port, () => {
  process.send("ready");
  console.log(`AL-1S is on listening on ${port}`);
});

process.on("SIGINT", () => {
  isDisableKeepAlive = true;
  server.close(() => {
    console.log("아리스는 잠에 빠졌습니다.");
    process.exit(0);
  });
});

TelegramBotService.init();
