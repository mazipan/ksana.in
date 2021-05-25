export const HOME = process.env.NEXT_PUBLIC_HOME
export const META_IMAGE = process.env.NEXT_PUBLIC_META_IMAGE

export const tentang = '/tentang'
export const dashboard = '/dashboard'
export const pemendek = '/pemendek'
export const kebijakanPrivasi = '/kebijakan-privasi'
export const ketentuanLayanan = '/ketentuan-layanan'
export const login = '/auth/sign-in'
export const register = '/auth/sign-up'
export const forgetPasword = '/auth/forget-password'
export const setNewPassword = '/auth/set-new-password'

// internal slug used by the app
export const blacklistSlugs = [
  'tentang',
  'pemendek',
  'dashboard',
  'ketentuan-layanan',
  'kebijakan-privasi',
  'auth/sign-in',
  'auth/sign-up'
]
