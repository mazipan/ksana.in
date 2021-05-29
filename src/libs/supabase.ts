import { createClient } from '@supabase/supabase-js'

import { sendEvent } from './splitbee'
import { defaultFetchOption } from './fetcher'
import { apiSetSession, apiLogout, apiUrlsSave, apiUrlsDelete, apiUrlsPatch } from 'constants/paths'
import { EVENT_SIGN_OUT, LS_AUTH_TOKEN } from 'constants/common'

export const supabase: any = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export const setServerSideAuth: any = (event: any, session: any) => {
  fetch(apiSetSession, {
    ...defaultFetchOption,
    method: 'POST',
    body: JSON.stringify({ event, session })
  }).then((res) => res.json())
}

export const logout: any = async () => {
  const res = await fetch(apiLogout, {
    ...defaultFetchOption,
    method: 'POST'
  })
  return await res.json()
}

export const handleLogout: any = async () => {
  const currentSession = supabase.auth.currentSession

  const { error } = await logout()
  setServerSideAuth(EVENT_SIGN_OUT, currentSession)
  sendEvent('Logout')
  if (!error) {
    // hard reload to refresh data
    setTimeout(() => {
      window.localStorage.removeItem(LS_AUTH_TOKEN)
      window.location.assign('/')
    }, 500)
  }
}

export const saveUrl: any = async ({ userId, url, slug }: any) => {
  sendEvent('Save url')
  const res = await fetch(apiUrlsSave(userId), {
    ...defaultFetchOption,
    method: 'PUT',
    body: JSON.stringify({ url, slug })
  })
  return await res.json()
}

export const deletUrl: any = async ({ id }: any) => {
  sendEvent('Remove url')
  const res = await fetch(apiUrlsDelete(id), {
    ...defaultFetchOption,
    method: 'DELETE'
  })
  return await res.json()
}

export const updateSlug: any = async ({ id, slug }: any) => {
  sendEvent('Update url')
  const res = await fetch(apiUrlsPatch(id), {
    ...defaultFetchOption,
    method: 'PATCH',
    body: JSON.stringify({ slug })
  })
  return await res.json()
}
