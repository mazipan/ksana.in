import { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export const defaultFetchOption = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
  credentials: 'same-origin'
}

export const defaultGetOption = {
  method: 'GET',
  ...defaultFetchOption
}

export const defaultFetchWithAuthOption = () => {
  const currentSession: Session | null = supabase.auth.session()

  let headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (currentSession) {
    headers = {
      ...headers,
      Authorization: `Bearer ${currentSession?.access_token}`
    }
  }

  return {
    headers: new Headers(headers),
    credentials: 'same-origin'
  }
}

export const fetcher = (url: string, opts: any) =>
  fetch(url, {
    ...defaultGetOption,
    ...opts
  }).then((r) => r.json())

export const fetcherWithAuth = (url: string, opts?: any) =>
  fetch(url, {
    ...defaultFetchWithAuthOption(),
    ...opts
  }).then((r) => r.json())
