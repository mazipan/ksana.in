export const EVENT_SIGN_IN: string = 'SIGNED_IN'
export const EVENT_SIGN_OUT: string = 'SIGNED_OUT'

export const COOKIE_AUTH_TOKEN: string = 'sb:token'

export const LS_AUTH_TOKEN: string = 'supabase.auth.token'
export const LS_FP_TOKEN: string = 'ksana.in.fp-at'

export const CB_RECOVERY: string = 'recovery'
export const CB_SIGNUP: string = 'signup'

export const isEnableGoogleLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_GOOGLE_ENABLED === 'true'
export const isEnableTwitterLogin: boolean =
  process.env.NEXT_PUBLIC_LOGIN_TWITTER_ENABLED === 'true'
export const isEnableGithubLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_GITHUB_ENABLED === 'true'
export const isEnableEmailLogin: boolean = process.env.NEXT_PUBLIC_LOGIN_EMAIL_ENABLED === 'true'
