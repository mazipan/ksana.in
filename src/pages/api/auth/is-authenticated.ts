import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '~/constants/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = req.cookies
    const accessToken = cookies[COOKIE_ACCESS_TOKEN] || ''
    const refreshToken = cookies[COOKIE_REFRESH_TOKEN] || ''

    if (accessToken && refreshToken) {
      const { user, error } = await supabase.auth.api.getUserByCookie(req, res)

      if (!error && user && user?.id) {
        res.statusCode = 200
        res.json({
          success: true,
          isLogin: !!user,
          created_at: user.created_at,
          email: user.email,
          id: user.id,
          updated_at: user.updated_at
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
