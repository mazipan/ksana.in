import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.user_id
    const { url, slug } = req.body

    const { data, error } = await supabase.from('urls').insert([
      {
        real_url: url,
        slug: sanitizeSlug(slug),
        user_id: userId
      }
    ])

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
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error
    })
  }
}
