import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id

    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data: dataUserId } = await supabase.from('urls').select('user_id').eq('id', id).single()

    if (dataUserId && dataUserId.user_id) {
      if (dataUserId.user_id === user.id) {
        const { data, error } = await supabase.from('urls').delete().match({ id: id })

        if (error) {
          res.statusCode = 400
          res.json({
            success: false,
            error: error
          })
        } else {
          res.statusCode = 200
          res.json({
            success: true,
            data: data
          })
        }
      }
    }

    res.statusCode = 401
    res.json({
      success: false,
      error: {
        message: 'You have no authorization to perform this action'
      }
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      data: null,
      error: error
    })
  }
}
