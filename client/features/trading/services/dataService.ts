import request from 'superagent'

const rootUrl = 'api/v1/trades'

export function getSymbols(): Promise<string[]> {
  return request.get(rootUrl + '/symbols').then((res) => {
    return res.body.symbols
  })
}
