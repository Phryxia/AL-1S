import type TelegramBot from "node-telegram-bot-api";

export type TextRouterCondition = string | RegExp;

export interface TextRouterContext {
  bot: TelegramBot;
  message: TelegramBot.Message;
  currentPath: string[];
  remainText: string;
}

export type TextRouterCallback = (context: TextRouterContext) => void;
