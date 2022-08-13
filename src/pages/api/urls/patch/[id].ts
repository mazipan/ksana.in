import { NextApiRequest, NextApiResponse } from 'next'

import { sendError401, sendError5xx, sendErrorSlugExist } from '../../_utils'
import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

/**
 * To update certain url
 *
 * Required Params: user_id
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id
    const { slug, realUrl } = req.body

    const { user } = await supabase.auth.api.getUserByCookie(req)

    const { data: existingData } = await supabase
      .from('urls')
      .select('id,user_id,real_url,slug')
      .eq('id', id)
      .single()

    if (existingData && existingData.user_id) {
      // Make sure the url is belong to the user session
      if (existingData.user_id === user?.id) {
        // check the new slug availability
        const { error: errorRealSlug } = await supabase
          .from('urls')
          .select('slug')
          .eq('slug', sanitizeSlug(slug))
          .single()

        // if it's exist, we will get the error
        if (errorRealSlug) {
          const { data, error } = await supabase
            .from('urls')
            .update({ slug: sanitizeSlug(slug), real_url: realUrl })
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
