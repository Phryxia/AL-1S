import { Temporal } from '@js-temporal/polyfill'

type Birth = {
  chatId: number
  name: string
  birthday: Temporal.PlainDate
  waifus: any[]
}

type RefinedBirth = {
  name: string
  birthday: string
  remainDays: number
}

// 생일까지 남은 날짜를 계산하는 함수
const getRemainDays = (baseDay: Temporal.PlainDate, birthday: Temporal.PlainDate) => {
  const currentYear = Temporal.Now.PlainDate('iso8601').year
  baseDay = baseDay.with({ year: currentYear  })
  birthday = birthday.with({ year: currentYear })

  const duration = baseDay.until(birthday)
  if (duration.sign === -1) {
    return baseDay.until(birthday.add({ years: 1 })).days
  }
  return duration.days
}

// const compareBirthday

// NOTE: 실제 db에 넣는걸 미루기로..
const births: Birth[] = [
  {
    chatId: -785108618,
    name: '최종근',
    birthday: Temporal.PlainDate.from('1995-06-13'),
    waifus: [],
  },
  {
    chatId: -785108618,
    name: '권세규',
    birthday: Temporal.PlainDate.from('1994-05-07'),
    waifus: [],
  },
  {
    chatId: -785108618,
    name: '아리스',
    birthday: Temporal.PlainDate.from('1994-03-25'),
    waifus: [],
  },
  {
    chatId: 50913950,
    name: '권세규(개인)',
    birthday: Temporal.PlainDate.from('1994-05-07'),
    waifus: [],
  },
]

export const getBirthlistByChatId = async (chatId: number) => {
  // db에서 찾는걸 모의함
  const birthsOfCurrentChat = births
    .filter((birth) => birth.chatId === chatId)
    .map((birth) => {
      const remainDays = getRemainDays(Temporal.Now.plainDateISO(), birth.birthday)
      return {
        name: birth.name,
        birthday: birth.birthday.toString(),
        remainDays,
      }
    })
    .sort((a, b) => a.remainDays - b.remainDays)
    .map((birth) => {
      return `${birth.name}(${birth.birthday}) : ${birth.remainDays}일 남았습니다.`
    })
  const prefix = '생일자 리스트입니다.'
  const postfix = '미리미리 축하해주세요'
  return decodeURIComponent(`${prefix}
${birthsOfCurrentChat.join('\n')}
${postfix}
`)
}
