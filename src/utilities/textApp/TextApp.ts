import TelegramBot from "node-telegram-bot-api";
import { TextRouter } from "./TextRouter";
import { TextRouterContext } from "./shared";

export class TextApp extends TextRouter {
  public constructor(bot: TelegramBot) {
    super();

    bot.on("message", (message) => {
      const context: TextRouterContext = {
        bot,
        message,
        currentPath: [],
        remainText: message.text?.replace("@tendou_arisu_bot", "").trim() ?? "",
      };

      this.run(context);
    });
  }
}
