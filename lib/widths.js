import { Buffer } from 'buffer'
import { UnicodeTrie } from '@cto.af/unicode-trie'

export const version = '15.0.0'
export const inputFileDate = new Date('2022-08-05T22:17:05.000Z')
export const generatedDate = new Date('2023-06-14T19:40:52.255Z')
export const Width = new UnicodeTrie(Buffer.from(
  `AAARAAAAAADbBAAAGx95MJ4Jts2CbayTN4fNM2YiTX05KTO6HZxGQBAAoE72syYF9WoBBPj/
   7lfqK7JsTPwagaDMClfgX0A5uqRQ/2Ze7tBPWhZ2zzpTVakqffXL4KaI8MQuvl4j50HwIQiC
   IAgGgmAgCBaCYGHhbP4oRx2aoA+GYAymYA6WYA22QIKxs/Gg4Ojcs7iCO3iCN3iBD/iCP9fV
   0QfmsIfzNe8U+Ynu80lIhEDPGrYxI99YOe5cZgcrP3o0bGnUvkoWYncOhOsncgFcx308w1t8
   wW+rQg9msINbzRd2EUoM+3VRUqLxiX+QKws/bxnm4/0UoxqN0AId0Lp6YAAjmMAMFrCC9Wxn
   P8c5j66X1Kmqi+u1U/dRGBpHNq09x9LiXewU+40/h5iVGLVP0DKzV2XMT2Mrj4WmV2FYMGXq
   gGOYkjPgaNxQZS7byISz3xA5HIyZt9EQp0ceC7ECq7/j5PiP2Z44IspNPtkJROznbdDzjCY1
   tRRRyZO9wObcByzh5Q0n4IMNfjtgw+02x5NoxvxD8ckJYAEuWOO/GAO20OYUS1J1scPJa5bG
   PXXbjNvQUhLrTr37Hb8uK13j42IDn3Zf6dTtcl/X5BcuyQu79TqaJF+posVX/u7hGyOHXHoz
   NSI9BMtps9Qnlyck3bPxvibd+1zSJ9s3KktXfPumnCqyR/Mhysa6LtUINPdDN7xIt9DemS6+
   Xh8N9MkMd7zTUrZnzbNLXYutD+XkXnC02BsaT8TmQl0U18A+3MMTvManvQP7K3eNWn1YrE6N
   69YwZV0Bb3iXzvVq23LOBjX85DVsXNMUDddHeKH+v+XVhX9nWeXNIPrD/5WMQYRGKgR4vyTX
   A0ruRKccg9sh0QjK4tHL2wWnjKBO1siwu0tdIpUqrN97OA5Dm1yjWCthqLIPzelx8gtfBb+a
   FiUfVE07OSSWyy0mrEGa8j7HLn2dosLkm/Qq8r7GJhl6FxOZKCJnFUW5jE4s5A8aYRT+cdR+
   TCvxrjvTx5GsrbCnu7JTlnOAfbapZyJ1K2JyWLaolywFYmhz0OaXoejb4pgKuQtnKAKJwukm
   b4XXzhqTZZ/yk63/zqDceqzNqYB6noYDCXWEq4x0dNUdZI99+K8SIDL067cgfUs9XtfHicKm
   Sx/ocRLOPBpd+l5XRexZhGJNufDVvVocknnX8u4dBF4nAOKgCgmCICmJSFui/7rlF1O20Fd3
   IBTMNKBmDEcn74ZUHJMnvigJFLgVdgqjF0JLLiF+ivAfolbcrxViw4uR3AuU6V0vQ/NIapi8
   OXUASQpcBcvQCQ/Iv/SlFe4BSilJP7d2nwOPk0ME+II1gxBcvRiqwI8jlUOk7SDyV4B2zNWX
   ULskObRorr4Gz0AEhbVeRW9XvvAbZC8gNKO+cvhv1mhA7RWvOnQT+xchfd2zJE8dnKoo6fdl
   0gb4nm+HlEt/ku4lpqhRPSUXBsmFbPBFqPYTTWGxWwz8QSpwn9fKELIGPucEipd7hSAvqwo5
   aGLpgdVGmYTWJX0MJd2gAiV19s6dhoiJ+awqebOOWboMOg7vzhUXE6pId6Cv0gONBVG5ZE7v
   3VBG9TgEev3qYqt+V2I7lkP626SmLncykA+9O43Ub8bsOKT+eej+vzs1HwKbPB8EY3Q+6l1q
   sflKMoZ6eYCqqvrfMIsAgFtdAw==`,
  'base64'
))
/**
 * @type {Record<string, number>}
 */
export const names = Object.fromEntries(
  Width.values.map((v, i) => [v, i])
)
export const values = Width.values
