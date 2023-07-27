import { NextApiRequest, NextApiResponse } from 'next'

import { getSessionFromCookie, sendError401, sendError5xx } from '../../_utils'
import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id

    const { data: dataSession } = await getSessionFromCookie(req)

    const { data: existingData } = await supabase
      .from('urls')
      .select('user_id')
      .eq('id', id)
      .limit(1)
      .single()

    if (existingData && existingData.user_id) {
      if (existingData.user_id === dataSession?.user?.id) {
        const { error } = await supabase.from('urls').delete().eq('id', id)

        const isError = error && Object.keys(error).length > 0
        if (isError) {
          res.statusCode = 400
        } else {
          res.statusCode = 200
        }

        res.json({
          success: !isError,
          data: !isError ? 'Deleted' : null,
          error: isError ? error : null
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
