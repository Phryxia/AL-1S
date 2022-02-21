import express from "express";
import TelegramBotService from "./service";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`AL-1S is on listening on ${port}`);
});

TelegramBotService.init();
