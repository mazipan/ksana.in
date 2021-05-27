import { createClient } from '@supabase/supabase-js'
import { apiSetSession, apiLogout } from '../constants/paths'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const setServerSideAuth = (event, session) => {
  fetch(apiSetSession, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  }).then((res) => res.json())
}

export const logout = async () => {
  const res = await fetch(apiLogout, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  })
  return await res.json()
}

export const login = async ({ email, password }) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ email, password })
  })
  return await res.json()
}
