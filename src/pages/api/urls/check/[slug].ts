import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = String(req.query.slug)

    const { error: errorRealSlug } = await supabase
      .from('urls')
      .select('real_url,slug')
      .eq('slug', sanitizeSlug(slug))
      .single()

    if (errorRealSlug) {
      res.statusCode = 404
      res.json({
        success: false,
        isExist: false,
        error: errorRealSlug
      })
    } else {
      res.statusCode = 200
      res.json({
        success: true,
        isExist: true
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      isExist: false,
      error: error
    })
  }
}
