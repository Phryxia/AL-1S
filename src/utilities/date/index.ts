import { Temporal } from '@js-temporal/polyfill'

const DATE_REGEX = /\d{4}-\d{2}-\d{2}/

export function parseDate(s: string): Temporal.PlainDate {
  if (!DATE_REGEX.test(s)) throw new Error('invalid date format')

  const [year = -1, month = -1, day = -1] = s
    .split('-')
    ?.map((token) => Number.parseInt(token, 10))

  if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31)
    throw new Error('invalid date format')

  return Temporal.PlainDate.from({
    year,
    month,
    day,
  })
}
