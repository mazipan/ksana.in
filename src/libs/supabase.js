import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const setServerSideAuth = (event, session) => {
  fetch('/api/auth/set-session', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  }).then((res) => res.json())
}

export const logout = async () => {
  const res = await fetch('/api/auth/logout', {
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

export const isAuthenticated = async () => {
  const res = await fetch('/api/auth/is-authenticated', {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  })
  return await res.json()
}
