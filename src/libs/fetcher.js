export const defaultFetchOption = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
  credentials: 'same-origin'
}

export const defaultGetOption = {
  method: 'GET',
  ...defaultFetchOption,
}

export const fetcher = (url, opts) =>
  fetch(url, {
    ...defaultGetOption,
    ...opts
  }).then((r) => r.json())
