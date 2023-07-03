import { CookieSerializeOptions } from 'cookie'

export const EVENT_SIGN_IN = 'SIGNED_IN'
export const EVENT_SIGN_OUT = 'SIGNED_OUT'

export const COOKIE_LIFETIME_ACCESS_IN_SECOND = 604800 // one week
export const COOKIE_LIFETIME_REFRESH_IN_SECOND = 2592000 // 30 days
export const COOKIE_ACCESS_TOKEN = 'sb-access-token'
export const COOKIE_REFRESH_TOKEN = 'sb-refresh-token'

export const LS_SESSION = 'sb-session'
export const LS_AUTH_TOKEN = 'supabase.auth.token'
export const LS_FP_TOKEN = 'ksana.in.fp-at'

export const CB_RECOVERY = 'recovery'
export const CB_SIGNUP = 'signup'

export const isEnableGoogleLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_GOOGLE_ENABLED === 'true'
export const isEnableTwitterLogin: boolean =
  process.env.NEXT_PUBLIC_LOGIN_TWITTER_ENABLED === 'true'
export const isEnableGithubLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_GITHUB_ENABLED === 'true'
export const isEnableEmailLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_EMAIL_ENABLED === 'true'

export const DEFAULT_COOKIE_OPTIONS: CookieSerializeOptions = {
  path: '/',
  sameSite: 'lax',
  secure: false,
  httpOnly: false
}
