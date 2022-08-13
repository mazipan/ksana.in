import { setSessionToServer } from './supabase'
import { EVENT_SIGN_IN, LS_FP_TOKEN, CB_RECOVERY, CB_SIGNUP } from 'constants/common'
import { setNewPassword, login, dashboard } from 'constants/paths'
import { IUrl } from '~/interfaces/IUrl'

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

export const validateURL = (url: string): { isValid: boolean; error: string } => {
  let isValid = true
  let error = ''
  if (url) {
    if (/^(https|http)/i.test(url)) {
      if (url.indexOf('http://localhost:3000') >= 0) {
        isValid = false
        error = 'Tidak menerima localhost'
      }
    } else {
      isValid = false
      error = 'Wajib dimulai dengan http atau https'
    }

    try {
      new URL(url)
    } catch {
      isValid = false
      error = 'Gagal melakukan parsing terhadap URL'
    }
  } else {
    isValid = false
    error = 'Tidak bisa dikosongkan'
  }

  return {
    isValid,
    error
  }
}

const PER_PAGE = 10

export function paginate(items: IUrl[], currentPage: number) {
  const page = currentPage || 1
  const offset = page === 1 ? 0 : (page - 1) * PER_PAGE

  const tempItems = [...items]

  const pagedItems = tempItems.slice(offset).slice(0, PER_PAGE)
  const totalPages = Math.ceil(items.length / PER_PAGE)

  const pages = []
  for (let index = 1; index <= totalPages; index++) {
    pages.push(index)
  }

  return {
    page,
    pages,
    perPage: PER_PAGE,
    prev: page === 1 ? null : page - 1,
    next: page === totalPages ? null : page + 1,
    totalRows: items.length,
    totalPages,
    pagedItems
  }
}
