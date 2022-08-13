import { NextApiRequest, NextApiResponse } from 'next'

import { sendError401, sendError5xx } from '../../_utils'
import { supabase } from 'libs/supabase'

/**
 * To get all urls available for certain user
 *
 * Required Params: user_id
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    if (user?.id) {
      const { data, error } = await supabase
        .from('urls')
        .select('id,user_id,real_url,slug,hit,is_dynamic,updated_at')
        .eq('user_id', user.id)
        .order('id', { ascending: false })

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
  } catch (error) {
    if (error instanceof Error) {
      sendError5xx(res, error)
    }
  }
}
