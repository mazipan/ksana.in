export const HOME: string = process.env.NEXT_PUBLIC_HOME || ''
export const META_IMAGE: string = `images/meta/meta-small.jpg`

export const META_ICON: string = `${HOME}images/favicon/ksana-48x48.png`

export const github: string = 'https://ksana.in/gh'
export const splitbeeAnalytics: string = 'https://app.splitbee.io/public/ksana.in'
export const tentang: string = '/tentang'
export const dashboard: string = '/dashboard'
export const blog: string = '/blog'
export const kebijakanPrivasi: string = '/kebijakan-privasi'
export const ketentuanLayanan: string = '/ketentuan-layanan'
export const login: string = '/auth/sign-in'
export const register: string = '/auth/sign-up'
export const forgetPasword: string = '/auth/forget-password'
export const setNewPassword: string = '/auth/set-new-password'

export const apiCounter: string = '/api/counter'

export const apiIsAuth: string = '/api/auth/is-authenticated'
export const apiSetSession: string = '/api/auth/set-session'
export const apiLogin: string = '/api/auth/login'
export const apiRegister: string = '/api/auth/register'
export const apiLogout: string = '/api/auth/logout'
export const apiForgetPassword: string = '/api/auth/forget-password'
export const apiSetNewPassword: string = '/api/auth/set-new-password'

export const apiUrlsCheck = (slug: string): string => `/api/urls/check/${slug}`
export const apiUrlsGet = (id: string): string => `/api/urls/get/${id}`
export const apiUrlsSave = (id: string): string => `/api/urls/save/${id}`
export const apiUrlsPatch = (id: string): string => `/api/urls/patch/${id}`
export const apiUrlsDelete = (id: string): string => `/api/urls/delete/${id}`

export const REDIRECT_CB: string = `${HOME}callback`

// internal slug used by the app
export const blacklistSlugs: string[] = [
  'tentang',
  'dashboard',
  'ketentuan-layanan',
  'kebijakan-privasi',
  'auth/sign-in',
  'auth/sign-up',
  'auth/forget-password',
  'auth/set-new-password'
]
