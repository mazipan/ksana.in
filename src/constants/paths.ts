export const HOME: string | undefined = process.env.NEXT_PUBLIC_HOME
export const META_IMAGE: string | undefined = process.env.NEXT_PUBLIC_META_IMAGE

export const github: string = 'https://ksana.in/gh'
export const splitbeeAnalytics: string = 'https://app.splitbee.io/public/ksana.in'
export const tentang: string = '/tentang'
export const dashboard: string = '/dashboard'
export const kebijakanPrivasi: string = '/kebijakan-privasi'
export const ketentuanLayanan: string = '/ketentuan-layanan'
export const login: string = '/auth/sign-in'
export const register: string = '/auth/sign-up'
export const forgetPasword: string = '/auth/forget-password'
export const setNewPassword: string = '/auth/set-new-password'

export const apiIsAuth: string = '/api/auth/is-authenticated'
export const apiSetSession: string = '/api/auth/set-session'
export const apiLogin: string = '/api/auth/login'
export const apiLogout: string = '/api/auth/logout'

export const apiUrlsGet: any = (id: number) => `/api/urls/get/${id}`
export const apiUrlsSave: any = (id: number) => `/api/urls/save/${id}`
export const apiUrlsPatch: any = (id: number) => `/api/urls/patch/${id}`
export const apiUrlsDelete: any = (id: number) => `/api/urls/delete/${id}`

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
