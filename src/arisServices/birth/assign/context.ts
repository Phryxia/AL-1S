import { Temporal } from '@js-temporal/polyfill'
import { ArisContext, TERMINATE_STATE_ID } from '@src/types/context'
import { parseDate } from '@src/utilities/date'

const enum BirthAssignStateName {
  ASK_NAME,
  ASK_DATE,
}

export interface BirthAssignStore {
  name: string
  date: Temporal.PlainDate
}

export function createBirthAssignContext(): ArisContext<BirthAssignStore> {
  const store: BirthAssignStore = {
    name: '',
    date: Temporal.Now.plainDateISO(),
  }

  return {
    contextName: 'birth-assign-context',
    store,
    states: [
      {
        stateName: 'ask-name',
        transitions: [
          {
            toId: BirthAssignStateName.ASK_DATE,
            shouldBeTriggered: (message) => {
              return (message.text?.trim().length ?? 0) >= 2
            },
            onTransition: (message) => {
              store.name = message.text?.trim() ?? ''

              return {
                text: `${message.text}의 생일은 언제입니까?`,
              }
            },
          },
        ],
        defaultTransition: {
          toId: BirthAssignStateName.ASK_NAME,
          onTransition: (message) => {
            return {
              text: `${message.text}는 이름같지 않습니다. 2글자 이상으로 입력해주세요.`,
            }
          },
        },
      },
      {
        stateName: 'ask-date',
        transitions: [
          {
            toId: TERMINATE_STATE_ID,
            shouldBeTriggered: (message) => {
              try {
                parseDate(message.text ?? '')
                return true
              } catch {
                return false
              }
            },
            onTransition: (message) => {
              store.date = parseDate(message.text ?? '')
              return {
                text: `${store.name}의 생일은 ${store.date.toString()}입니다.`,
              }
            },
          },
        ],
        defaultTransition: {
          toId: BirthAssignStateName.ASK_DATE,
          onTransition: (message) => {
            return {
              text: '날짜를 잘 이해하지 못했어요. 다음과 같이 입력해보세요\n1994-05-07',
            }
          },
        },
      },
    ],
  }
}
