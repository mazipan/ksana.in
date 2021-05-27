import { createClient } from '@supabase/supabase-js'
import { defaultFetchOption } from '../libs/fetcher'
import { apiSetSession, apiLogout, apiUrlsSave, apiUrlsDelete, apiUrlsPatch } from '../constants/paths'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const setServerSideAuth = (event, session) => {
  fetch(apiSetSession, {
    ...defaultFetchOption,
    method: 'POST',
    body: JSON.stringify({ event, session })
  }).then((res) => res.json())
}

export const logout = async () => {
  const res = await fetch(apiLogout, {
    ...defaultFetchOption,
    method: 'POST',
  })
  return await res.json()
}

export const saveUrl = async ({ userId, url, slug }) => {
  const res = await fetch(apiUrlsSave(userId), {
    ...defaultFetchOption,
    method: 'PUT',
    body: JSON.stringify({ url, slug })
  })
  return await res.json()
}

export const deletUrl = async ({ id }) => {
  const res = await fetch(apiUrlsDelete(userId), {
    ...defaultFetchOption,
    method: 'DELETE',
  })
  return await res.json()
}

export const updateSlug = async ({ id, slug }) => {
  const res = await fetch(apiUrlsPatch(id), {
    ...defaultFetchOption,
    method: 'PATCH',
    body: JSON.stringify({ slug })
  })
  return await res.json()
}
