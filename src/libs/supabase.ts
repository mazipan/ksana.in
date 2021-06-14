import { createClient, Session } from '@supabase/supabase-js'

import { sendEvent } from './splitbee'
import { defaultFetchOption } from './fetcher'
import {
  apiSetSession,
  apiLogin,
  apiLogout,
  apiUrlsCheck,
  apiUrlsSave,
  apiUrlsDelete,
  apiUrlsPatch,
  apiForgetPassword,
  apiSetNewPassword,
  REDIRECT_CB
} from 'constants/paths'
import { EVENT_SIGN_OUT, LS_AUTH_TOKEN } from 'constants/common'

export const supabase: any = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export const setSessionToServer = async (event: string, session: Session): Promise<void> => {
  fetch(apiSetSession, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  }).then((res) => res.json())
}

export type LoginArg = {
  email: string
  password: string
}

export const login = async ({ email, password }: LoginArg): Promise<any> => {
  sendEvent('Login')
  const res = await fetch(apiLogin, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ email, password })
  })

  return await res.json()
}

export const loginWithGoogle = async (): Promise<any> => {
  sendEvent('Login with Google')
  // Generate manual url
  // https://<your-ref>.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:3000/welcome
  await supabase.auth.signIn(
    {
      provider: 'google'
    },
    { redirectTo: REDIRECT_CB }
  )
}

export const logout = async (): Promise<void> => {
  await fetch(apiLogout, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin'
  }).then((res) => res.json())
}

export const handleLogout = async (): Promise<void> => {
  const currentSession = supabase.auth.currentSession

  await logout()
  await setSessionToServer(EVENT_SIGN_OUT, currentSession)
  sendEvent('Logout')
  // hard reload to refresh data
  setTimeout(() => {
    window.localStorage.removeItem(LS_AUTH_TOKEN)
    window.location.assign('/')
  }, 500)
}

export type ForgetPasswordArg = {
  email: string
}

export const forgetPassword = async ({ email }: ForgetPasswordArg): Promise<any> => {
  sendEvent('Reset password')
  const res = await fetch(apiForgetPassword, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ email })
  })

  return await res.json()
}

export type SetNewPasswordArg = {
  password: string
  accessToken: string
}

export const setNewPassword = async ({
  password,
  accessToken
}: SetNewPasswordArg): Promise<any> => {
  sendEvent('Set new password')
  const res = await fetch(apiSetNewPassword, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ password, accessToken })
  })

  return await res.json()
}

export type CheckSlugArg = {
  slug: string
}

export const checkSlug = async ({ slug }: CheckSlugArg): Promise<any> => {
  sendEvent('Check slug')
  const res = await fetch(apiUrlsCheck(slug), {
    ...defaultFetchOption,
    credentials: 'same-origin',
    method: 'GET'
  })
  return await res.json()
}

export type SaveUrlArg = {
  userId: string
  url: string
  slug: string
}

export const saveUrl = async ({ userId, url, slug }: SaveUrlArg): Promise<any> => {
  sendEvent('Save url')
  const res = await fetch(apiUrlsSave(userId), {
    ...defaultFetchOption,
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify({ url, slug })
  })
  return await res.json()
}

export type DeleteUrlArg = {
  id: string
}

export const deleteUrl = async ({ id }: DeleteUrlArg): Promise<any> => {
  sendEvent('Remove url')
  const res = await fetch(apiUrlsDelete(id), {
    ...defaultFetchOption,
    method: 'DELETE',
    credentials: 'same-origin'
  })
  return await res.json()
}

export type PatchSlugArg = {
  id: string
  slug: string
}

export const patchSlug = async ({ id, slug }: PatchSlugArg): Promise<any> => {
  sendEvent('Update url')
  const res = await fetch(apiUrlsPatch(id), {
    ...defaultFetchOption,
    method: 'PATCH',
    credentials: 'same-origin',
    body: JSON.stringify({ slug })
  })
  return await res.json()
}
