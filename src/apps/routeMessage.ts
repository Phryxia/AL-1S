import { ArisResponse } from '@src/types/arisResponse'
import TelegramBot from 'node-telegram-bot-api'

export interface TextRouterContext {
  message: TelegramBot.Message
  tokens: string[]
  currentIndex: number
  currentToken: string
}

export interface TextRouterConfig {
  rules: {
    pattern: string
    childConfig: TextRouterConfig
  }[]
  onMatchedCompletly(context: TextRouterContext): Promise<ArisResponse>
}
export async function routeMessage(
  { message, tokens, currentIndex }: TextRouterContext,
  config: TextRouterConfig,
): Promise<ArisResponse> {
  const nextToken = tokens[currentIndex + 1]
  const matchedRule = config.rules.find((rule) => nextToken === rule.pattern)

  if (matchedRule) {
    return await routeMessage(
      {
        message,
        tokens,
        currentIndex: currentIndex + 1,
        currentToken: nextToken,
      },
      matchedRule.childConfig,
    )
  }

  return await config.onMatchedCompletly({
    message,
    tokens,
    currentIndex: currentIndex + 1,
    currentToken: nextToken,
  })
}
