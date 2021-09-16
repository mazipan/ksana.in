import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

import { sendError401, sendError5xx, sendErrorSlugExist } from '../../_utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id
    const { slug } = req.body

    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data: dataUserId } = await supabase.from('urls').select('user_id').eq('id', id).single()

    if (dataUserId && dataUserId.user_id) {
      if (dataUserId.user_id === user?.id) {
        // check the slug availability
        const { error: errorRealSlug } = await supabase
          .from('urls')
          .select('slug')
          .eq('slug', sanitizeSlug(slug))
          .single()

        // if it's exist, we will get the error
        if (errorRealSlug) {
          const { data, error } = await supabase
            .from('urls')
            .update({ slug: sanitizeSlug(slug) })
            .match({ id: id })

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
          sendErrorSlugExist(res)
        }
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
