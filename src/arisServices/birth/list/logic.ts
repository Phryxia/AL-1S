import { Temporal } from '@js-temporal/polyfill'
import { DummyBirths } from '@src/constants'
import { Birth } from '@src/types'

type RefinedBirth = Birth & {
  remainDays: number
}

// 생일까지 남은 날짜를 계산하는 함수
function getRemainDays(baseDay: Temporal.PlainDate, birthday: Temporal.PlainDate) {
  const currentYear = Temporal.Now.plainDate('iso8601').year
  baseDay = baseDay.with({ year: currentYear })
  birthday = birthday.with({ year: currentYear })

  const duration = baseDay.until(birthday)
  if (duration.sign === -1) {
    return baseDay.until(birthday.add({ years: 1 })).days
  }
  return duration.days
}
export async function getBirthListMessageByChatId(chatId: number): Promise<string> {
  // db에서 찾는걸 모의함
  const refinedBirthList: RefinedBirth[] = DummyBirths.filter(
    (birth) => birth.chatId === chatId,
  )
    .map((birth) => {
      const remainDays = getRemainDays(Temporal.Now.plainDateISO(), birth.birthday)
      return {
        ...birth,
        remainDays,
      }
    })
    .sort((a, b) => a.remainDays - b.remainDays)

  return renderBirthList(refinedBirthList)
}

function renderBirthList(birthList: RefinedBirth[]): string {
  return `생일자 리스트입니다. 미리미리 축하해주세요.
${birthList
  .map(({ name, birthday, remainDays }) => {
    const rate = 1 - remainDays / 365
    return `${name}(${birthday.month}월 ${birthday.day}일) - D-${remainDays}
${renderProgressBar(rate, 10)} (${formatNumber(rate * 100, 2)}%)`
  })
  .join('\n\n')}`
}

function formatNumber(x: number, digit: number): string {
  const base = 10 ** digit
  const roundedXString = `${Math.round(x * base) / base}`
  const positionOfDot = roundedXString.lastIndexOf('.')

  if (positionOfDot === -1) return roundedXString

  return roundedXString.slice(0, positionOfDot + 3)
}

function renderProgressBar(rate: number, size: number): string {
  const numOfBlacks = Math.round(size * rate)
  const numOfWhites = size - numOfBlacks
  return `${'■'.repeat(numOfBlacks)}${'□'.repeat(numOfWhites)}`
}
