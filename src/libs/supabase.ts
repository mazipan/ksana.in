import { createClient } from '@supabase/supabase-js'

import { sendEvent } from './splitbee'
import { defaultFetchOption, fetcherWithAuth } from './fetcher'
import {
  apiSetSession,
  apiLogin,
  apiRegister,
  apiLogout,
  apiUrlsCheck,
  apiUrlsSave,
  apiUrlsDelete,
  apiUrlsPatch,
  apiForgetPassword,
  apiSetNewPassword,
  REDIRECT_CB
} from 'constants/paths'
import {
  COOKIE_LIFETIME_ACCESS_IN_SECOND,
  EVENT_SIGN_OUT,
  LS_AUTH_TOKEN,
  LS_SESSION
} from 'constants/common'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false,
      storageKey: LS_SESSION,
      // @ts-ignore -- not sure why Supabase remove this options
      cookieOptions: {
        lifetime: COOKIE_LIFETIME_ACCESS_IN_SECOND
      }
    }
  }
)

export const setSessionToServer = async (event: string, session: any): Promise<void> => {
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

type Provider = 'google' | 'github' | 'twitter'

export const loginWith3rdParty = async (provider: Provider): Promise<any> => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: REDIRECT_CB
    }
  })
}

export const loginWithGoogle = async (): Promise<any> => {
  sendEvent('Login with Google')
  loginWith3rdParty('google')
}

export const loginWithGithub = async (): Promise<any> => {
  sendEvent('Login with Github')
  loginWith3rdParty('github')
}

export const loginWithTwitter = async (): Promise<any> => {
  sendEvent('Login with Twitter')
  loginWith3rdParty('twitter')
}

export type RegisterArg = {
  email: string
  password: string
}

export const register = async ({ email, password }: RegisterArg): Promise<any> => {
  sendEvent('Register')
  const res = await fetch(apiRegister, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ email, password })
  })

  return await res.json()
}

export const logout = async (): Promise<void> => {
  await fetch(apiLogout, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin'
  }).then((res) => res.json())
}

export const handleLogout = async (): Promise<void> => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  await logout()
  await setSessionToServer(EVENT_SIGN_OUT, session)
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
  refreshToken: string
}

export const setNewPassword = async ({
  password,
  refreshToken,
  accessToken
}: SetNewPasswordArg): Promise<any> => {
  sendEvent('Set new password')
  const res = await fetch(apiSetNewPassword, {
    ...defaultFetchOption,
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ password, accessToken, refreshToken })
  })

  return await res.json()
}

export type CheckSlugArg = {
  slug: string
}

export const checkSlug = async ({ slug }: CheckSlugArg): Promise<any> => {
  sendEvent('Check slug')
  const res = await fetcherWithAuth(apiUrlsCheck(slug))
  return res
}

export type SaveUrlArg = {
  userId: string
  url: string
  slug: string
  is_dynamic: boolean
}

export const saveUrl = async ({ userId, url, slug, is_dynamic }: SaveUrlArg): Promise<any> => {
  sendEvent('Save url', { url, slug, is_dynamic: `${is_dynamic}`, userId })
  const res = await fetcherWithAuth(apiUrlsSave(), {
    method: 'PUT',
    body: JSON.stringify({ url, slug, is_dynamic })
  })
  return res
}

export type DeleteUrlArg = {
  id: string
  userId: string
}

export const deleteUrl = async ({ id, userId }: DeleteUrlArg): Promise<any> => {
  sendEvent('Remove url')
  const res = await fetcherWithAuth(apiUrlsDelete(id), {
    method: 'DELETE',
    body: JSON.stringify({ userId })
  })
  return res
}

export type PatchSlugArg = {
  id: string
  slug: string
  userId: string
  realUrl: string
}

export const patchSlug = async ({ id, slug, userId, realUrl }: PatchSlugArg): Promise<any> => {
  sendEvent('Update url')
  const res = await fetcherWithAuth(apiUrlsPatch(id), {
    method: 'PATCH',
    body: JSON.stringify({ slug, userId, realUrl })
  })
  return res
}
