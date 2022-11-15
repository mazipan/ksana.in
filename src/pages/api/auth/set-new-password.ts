import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '~/constants/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password, accessToken, refreshToken } = req.body

    const cookies = req.cookies
    const accessTokenFromCookie = cookies[COOKIE_ACCESS_TOKEN] || ''
    const refreshTokenFromCookie = cookies[COOKIE_REFRESH_TOKEN] || ''

    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken || accessTokenFromCookie,
      refresh_token: refreshToken || refreshTokenFromCookie
    })

    if (!error && data && data.user) {
      const { data: dataUpdate, error: errorUpdate } = await supabase.auth.updateUser({
        password: password
      })

      if (!errorUpdate && dataUpdate) {
        res.statusCode = 200
        res.json({
          success: true,
          ...dataUpdate
        })
      } else {
        res.statusCode = 500
        res.json({
          success: true,
          error: errorUpdate || 'Error happened!'
        })
      }
    } else {
      res.statusCode = 500
      res.json({
        success: true,
        error: error || 'Error happened!'
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error
    })
  }
}
