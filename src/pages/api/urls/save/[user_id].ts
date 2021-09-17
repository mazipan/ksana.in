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
      if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
        res.statusCode = 500
        res.json({
          success: false,
          data: null,
          error: {
            message: 'Your URL not contain http:// or https://'
          }
        })
        return
      }

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
    if (error instanceof Error) {
      sendError5xx(res, error)
    }
  }
}
