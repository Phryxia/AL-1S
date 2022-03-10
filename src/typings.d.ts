declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_AUTH_TOKEN: string
    NODE_ENV: 'development' | 'production'
    WEBHOOK_KEY: string
    TELEGRAM_BOT_TOKEN: string
    MONGO_DB_URI: string
    MONGO_DB_USER: string
    MONGO_DB_PASSWORD: string
  }
}
