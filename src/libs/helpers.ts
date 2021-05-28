import { LS_FP_TOKEN, CB_RECOVERY, CB_SIGNUP } from 'constants/common'
import { setNewPassword, login } from 'constants/paths'

export const callbackHandler = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const urlObj = new URL(`https://example.com?${hash.slice(1)}`)
      const type = urlObj.searchParams.get('type') || ''
      if (type === CB_RECOVERY) {
        const accessToken: any = urlObj.searchParams.get('access_token')
        window.localStorage.setItem(LS_FP_TOKEN, accessToken)
        window.location.assign(setNewPassword)
      } else if (type === CB_SIGNUP) {
        const accessToken: any = urlObj.searchParams.get('access_token')
        window.localStorage.setItem(LS_FP_TOKEN, accessToken)
        window.location.assign(login)
      }
    }
  }
}

export const sanitizeSlug: any = (slug: any): any => {
  return slug.replace(/[^0-9a-zA-Z.-]/g, '')
}
