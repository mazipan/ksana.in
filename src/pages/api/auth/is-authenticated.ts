import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '~/constants/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = req.cookies
    const accessToken = cookies[COOKIE_ACCESS_TOKEN] || ''
    const refreshToken = cookies[COOKIE_REFRESH_TOKEN] || ''

    if (accessToken && refreshToken) {
      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken,
        access_token: accessToken
      })

      if (!error && data && data.user && data.user.id) {
        res.statusCode = 200
        res.json({
          success: true,
          isLogin: !!data?.user,
          created_at: data?.user?.created_at,
          email: data?.user?.email,
          id: data?.user?.id,
          updated_at: data?.user?.updated_at
        })
      } else {
        // expect unauthorized
        res.statusCode = 401
        res.json({
          success: true,
          isLogin: false,
          error: error || {
            message: 'You have no authorization to perform this action'
          }
        })
      }
    } else {
      // expect unauthorized
      res.statusCode = 401
      res.json({
        success: true,
        isLogin: false,
        error: {
          message: 'Can not found the token to authenticate'
        }
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      isLogin: false,
      error: error
    })
  }
}
