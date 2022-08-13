export const HOME: string = process.env.NEXT_PUBLIC_HOME || ''
export const META_IMAGE = `images/meta/meta-small.jpg`

export const META_ICON = `${HOME}images/favicon/ksana-48x48.png`

export const github = 'https://ksana.in/gh'
export const splitbeeAnalytics = 'https://app.splitbee.io/public/ksana.in'
export const tentang = '/tentang'
export const dashboard = '/dashboard'
export const blog = '/blog'
export const kebijakanPrivasi = '/kebijakan-privasi'
export const ketentuanLayanan = '/ketentuan-layanan'
export const login = '/auth/sign-in'
export const register = '/auth/sign-up'
export const forgetPasword = '/auth/forget-password'
export const setNewPassword = '/auth/set-new-password'

export const apiCounter = '/api/counter'

export const apiIsAuth = '/api/auth/is-authenticated'
export const apiSetSession = '/api/auth/set-session'
export const apiLogin = '/api/auth/login'
export const apiRegister = '/api/auth/register'
export const apiLogout = '/api/auth/logout'
export const apiForgetPassword = '/api/auth/forget-password'
export const apiSetNewPassword = '/api/auth/set-new-password'

export const apiUrlsCheck = (slug: string): string => `/api/urls/check/${slug}`
export const apiUrlsGet = (): string => `/api/urls/get/all`
export const apiUrlsSave = (): string => `/api/urls/save/newurl`
export const apiUrlsPatch = (id: string): string => `/api/urls/patch/${id}`
export const apiUrlsDelete = (id: string): string => `/api/urls/delete/${id}`

export const REDIRECT_CB = `${HOME}callback`

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
