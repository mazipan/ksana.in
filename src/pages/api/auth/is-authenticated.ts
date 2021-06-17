import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (!error && user.id) {
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
        isLogin: !!user,
        error: error || {
          message: 'You have no authorization to perform this action'
        }
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error,
      isLogin: false
    })
  }
}
