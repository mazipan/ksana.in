export const HOME = process.env.NEXT_PUBLIC_HOME
export const META_IMAGE = process.env.NEXT_PUBLIC_META_IMAGE

export const github = 'https://ksana.in/gh'
export const splitbeeAnalytics = 'https://app.splitbee.io/public/ksana.in'
export const tentang = '/tentang'
export const dashboard = '/dashboard'
export const kebijakanPrivasi = '/kebijakan-privasi'
export const ketentuanLayanan = '/ketentuan-layanan'
export const login = '/auth/sign-in'
export const register = '/auth/sign-up'
export const forgetPasword = '/auth/forget-password'
export const setNewPassword = '/auth/set-new-password'

export const apiIsAuth = '/api/auth/is-authenticated'
export const apiSetSession = '/api/auth/set-session'
export const apiLogin = '/api/auth/login'
export const apiLogout = '/api/auth/logout'

export const apiUrlsGet = id => `/api/urls/get/${id}`
export const apiUrlsSave = id => `/api/urls/save/${id}`
export const apiUrlsPatch = id => `/api/urls/patch/${id}`
export const apiUrlsDelete = id => `/api/urls/delete/${id}`

// internal slug used by the app
export const blacklistSlugs = [
  'tentang',
  'dashboard',
  'ketentuan-layanan',
  'kebijakan-privasi',
  'auth/sign-in',
  'auth/sign-up',
  'auth/forget-password',
  'auth/set-new-password'
]
