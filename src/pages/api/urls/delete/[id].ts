import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

import { sendError401, sendError5xx } from '../../_utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id

    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data: dataUserId } = await supabase.from('urls').select('user_id').eq('id', id).single()

    if (dataUserId && dataUserId.user_id) {
      if (dataUserId.user_id === user?.id) {
        const { data, error } = await supabase.from('urls').delete().match({ id: id })

        if (error) {
          res.statusCode = 400
        } else {
          res.statusCode = 200
        }

        res.json({
          success: !error,
          data: data,
          error: error
        })
      } else {
        sendError401(res)
      }
    } else {
      sendError401(res)
    }
  } catch (error) {
    if (error instanceof Error) {
      sendError5xx(res, error)
    }
  }
}
