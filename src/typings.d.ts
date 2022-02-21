declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_AUTH_TOKEN: string;
    NODE_ENV: "development" | "production";
    WEBHOOK_KEY: string;
    TELEGRAM_BOT_TOKEN: string;
  }
}
