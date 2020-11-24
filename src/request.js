import fp from 'lodash/fp'
// export default function request(path, method, data) {
//   return fetch(`http://localhost:1337/${path}`, {
//     method,
//     body: data ? JSON.stringify(data) : null,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then((r) => r.json());
// }
const splitBy = fp.curry((count, arr) => fp.range(0, count).map(x => arr.slice(count * x, count * (x + 1))))

const matrixMapper = fp.pipe(
  splitBy(16),
  (arr) => arr.map((line, index) => index % 2 ? line : fp.reverse(line)),
  fp.flatten
)

export default function request(path, method, data) {
  const form = new FormData()
  form.append('data', JSON.stringify(matrixMapper(data)))
  return fetch(`http://192.168.0.148/${path}/`, {
    method,
    body: form,
    mode: 'no-cors'
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }).then((r) => r.text());
}
