import { LS_FP_TOKEN, COOKIE_AUTH_TOKEN, CB_RECOVERY, CB_SIGNUP } from 'constants/common'
import { setNewPassword, login, dashboard } from 'constants/paths'

export const setCookie = (name: string, value: string, days: number) => {
  const d = new Date()

  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toUTCString()
}

export const callbackHandler = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const urlObj = new URL(`https://example.com?${hash.slice(1)}`)
      const type = urlObj.searchParams.get('type') || ''
      const accessToken: any = urlObj.searchParams.get('access_token') || ''

      if (type === CB_RECOVERY) {
        window.localStorage.setItem(LS_FP_TOKEN, accessToken)
        window.location.assign(setNewPassword)
      } else if (type === CB_SIGNUP) {
        window.location.assign(login)
      } else if (accessToken) {
        setCookie(COOKIE_AUTH_TOKEN, accessToken, 7)
        window.location.assign(dashboard)
      }
    }
  }
}

export const sanitizeSlug: any = (slug: any): any => {
  return slug.replace(/[^0-9a-zA-Z.-]/g, '')
}
