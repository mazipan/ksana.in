import { NextApiRequest, NextApiResponse } from 'next'

import { setCookie, deleteCookie } from 'cookies-next'
import { supabase } from 'libs/supabase'
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_LIFETIME_ACCESS_IN_SECOND,
  COOKIE_LIFETIME_REFRESH_IN_SECOND,
  COOKIE_REFRESH_TOKEN,
  EVENT_SIGN_OUT
} from '~/constants/common'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { event, session } = req.body

  if (event === EVENT_SIGN_OUT) {
    // Reset cookie
    deleteCookie(COOKIE_REFRESH_TOKEN, { req, res })
    deleteCookie(COOKIE_ACCESS_TOKEN, { req, res })
    res.statusCode = 200
    res.json({
      success: true,
      isLogin: false
    })
  } else {
    const accessToken = session.access_token || ''
    const refreshToken = session.refresh_token || ''

    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken
    })

    if (!error && data && data.user) {
      setCookie(COOKIE_REFRESH_TOKEN, refreshToken, {
        req,
        res,
        maxAge: COOKIE_LIFETIME_REFRESH_IN_SECOND
      })
      setCookie(COOKIE_ACCESS_TOKEN, accessToken, {
        req,
        res,
        maxAge: COOKIE_LIFETIME_ACCESS_IN_SECOND
      })

      res.statusCode = 200
      res.json({
        success: true,
        isLogin: !!data.user,
        created_at: data.user.created_at,
        email: data.user.email,
        id: data.user.id,
        updated_at: data.user.updated_at
      })
    } else {
      console.error('[SetSession]', error)
      res.statusCode = 401
      res.json({
        success: true,
        isLogin: false,
        error: error || {
          message: 'Can not found the token to authenticate'
        }
      })
    }
  }
}
