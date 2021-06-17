import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

import { sendErrorSlugExist, sendError5xx } from '../../_utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id
    const { url, slug } = req.body

    // check the slug availability
    const { error: errorRealSlug } = await supabase
      .from('urls')
      .select('slug')
      .eq('slug', sanitizeSlug(slug))
      .single()

    // if it's exist, we will get the error
    if (errorRealSlug) {
      const { data, error } = await supabase.from('urls').insert([
        {
          real_url: url,
          slug: sanitizeSlug(slug),
          user_id: userId
        }
      ])

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
  } catch (error) {
    sendError5xx(res, error)
  }
}
