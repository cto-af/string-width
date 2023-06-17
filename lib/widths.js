import { Buffer } from 'buffer'
import { UnicodeTrie } from '@cto.af/unicode-trie'

export const version = '15.0.0'
export const inputFileDate = new Date('2022-08-05T22:17:05.000Z')
export const generatedDate = new Date('2023-06-17T16:24:28.610Z')
export const Width = new UnicodeTrie(Buffer.from(
  `AAARAAAAAADdBAAAGx95MJ4Jts2CbayTN4fNM2YRXbY9d4GqY3iCF4gAAHWynzUpqFcLIMD/
   d+1TX5FlY+LXCARlVrgCTwHl6pJCPc1/uZ8maVnYPetMVaWq9NUvn1NEeGIXX6+R8yD4EARB
   EAQDQTAQBAtBsLBwNneUogZN0AdDMAZTMAdLsAZbINEYO+sPCo7OPYsruIMneIMX+IAv+HNd
   HX1gCls4XvNMkZ/oPq8ERQh0rWEbM/KNlePOpXewcqNLwxZH9atkNYrdORCun8gFcB338Qxv
   8QW/rQo9mMAGLte8YTfBRHFQFyUk6p/4BxtXBn7eMszF+ylEJRqgBTqgdfXAAEYwgRksYAXr
   2c5+jnMeXS+pU1UX12un7qMw1I9suvccS4t3sVPsN/4cYlZ81D5By8x+lVE/9a08FppeBQqm
   jO1zDFNy+hyNG6jMZSuZcPQbIofRmHkbDXB65LEQK7D6O06O/5jtiSOi3OSTnUDYQZ4GPM9o
   sqeWIiJ5shfYnPuAJby84QR8sIFvB2y43eZ4Es2Yfii0E74FuHDd8C8EA7bQ5hRLUjWxw4lr
   lsY9ddu029BSEutOvfsdvy4rXePjYv2fdl/p1O1yX9fkFy6JC7v1OpokX6mixVf+7uEbI4dc
   ejM1Il0Ey2mz1CeXJyTdtfG+Jt37XMIn2zcqQ1d8+6acKrBL8yFKxrou1QA090MnvEi30N6Z
   Lr5eHw30yQx3vNNStmfNs0tdi60P5eRecLTYG+pPxOZCTRTXwD7cwxO8xqf9A/srd41afVis
   Tg1r1jBlWQFveJeO9Wjbcs4GNPTkNWxMUxQN10N4of6/5dSFf2dJ5cwg+sP/lYxBhEYqBHi/
   JNcFSu5EuxyDWyFRD8ri0cvbBaeMoE7WyLC7S00ilQqs3384DkObXKNYK2Gosg/N6XHyC18F
   v5oWJR9UTTs5JJbLLSasQZryPscufZ2iwvSbdCnyvsYmGXoXE5koImf1RLmMTyzkR40wCv84
   aj+mlXjXnenjSNZW2NNd2S7LOcA+29QzkboVMTksW9RKlgIxtDlo88tQ9G1xTIXchTMUgUTh
   dJO3wmtnjcmyT/nJ1n9nUG491uZUQD1Pw0hCHeEqIx1ddQfZYx/+qwSIDP36LUjfUo/X9XGi
   sOnSB3qchDOPRpe+11URexahWFMufHWvFodk3rW8e6PA6wRAjKqQIAiSkoi0JfqvW34xZQt9
   dQdCwUwDasZwdPIOeMUxeeKLkkCBW2G7MHohNOUS4qcI/yFqxv2aITa8GMm9QJne9TI0j6SG
   yZtTB5CkwFWwDO3wgPxLX1rhHqCUkvRza/c58Dg5RIAvWDMIwdWLoQr8OFI5RNoOIn8FaMdc
   fQm1S5JDi+bqa/AMRFBY61X0duULv0H2AkIz6iuH/2aNBtRe8apDJ7F/EdLXPUvy1MGpipJ+
   XyZtgO/5tkm59CfpXmKKGtVTcmGQXMgGX4RqP9EUFrvFwB+kAvd5rQwha+BzTqB4uVcI8rKq
   kFETSw+sNsoktC7pYyjpBhUoqbN37jRETMxnVcmbdczSZdBxeHeuuJhQRbsD/ZSONBZE5ZI5
   vXdDGdXjEOj1q4ut+l2J7VgO6W+TmrrcyUA+9O40Ur8Zs+OQ+ueh+//u1HwIbPI8EIxR+qh3
   qMXmK8kY6uUBqqrqf8MAiwCAW10D`,
  'base64'
))
/**
 * @type {Record<string, number>}
 */
export const names = Object.fromEntries(
  Width.values.map((v, i) => [v, i])
)
export const values = Width.values
