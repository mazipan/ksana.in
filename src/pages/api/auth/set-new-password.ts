import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password, accessToken } = req.body

    const { data, error } = await supabase.auth.api.updateUser(accessToken, {
      password: password
    })

    if (!error && data) {
      res.statusCode = 200
      res.json({
        success: true,
        ...data
      })
    } else {
      res.statusCode = 400
      res.json({
        success: true,
        error: error || null
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
