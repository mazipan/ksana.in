import { EVENT_SIGN_IN, LS_FP_TOKEN, CB_RECOVERY, CB_SIGNUP } from 'constants/common'
import { setNewPassword, login, dashboard } from 'constants/paths'

import { setSessionToServer } from './supabase'

export const callbackHandler = async () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const urlObj = new URL(`https://example.com?${hash.slice(1)}`)
      const type = urlObj.searchParams.get('type') || ''
      const accessToken = urlObj.searchParams.get('access_token') || ''

      if (type === CB_RECOVERY) {
        window.localStorage.setItem(LS_FP_TOKEN, accessToken)
        window.location.assign(setNewPassword)
      } else if (type === CB_SIGNUP) {
        window.location.assign(login)
      } else if (accessToken) {
        // check again for session value. get token type & user
        await setSessionToServer(EVENT_SIGN_IN, {
          access_token: accessToken,
          token_type: '',
          user: null
        })
        setTimeout(() => {
          window.location.assign(dashboard)
        }, 500)
      }
    }
  }
}

export const sanitizeSlug = (slug: string) => {
  return slug.replace(/[^0-9a-zA-Z.-]/g, '')
}
