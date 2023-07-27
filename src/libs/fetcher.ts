export const defaultFetchOption = {
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
}

export const defaultGetOption = {
  method: 'GET',
  ...defaultFetchOption
}

export const defaultFetchWithAuthOption = defaultFetchOption

export const fetcher = (url: string, opts: any) =>
  fetch(url, {
    ...defaultGetOption,
    ...opts
  }).then((r) => r.json())

export const fetcherWithAuth = (url: string, opts?: any) =>
  fetch(url, {
    ...defaultFetchWithAuthOption,
    ...opts
  }).then((r) => r.json())
