import { Temporal } from '@js-temporal/polyfill'
import { Waifu } from './waifu'

export type Birth = {
  chatId: number
  name: string
  birthday: Temporal.PlainDate
  waifus: Waifu[]
}
