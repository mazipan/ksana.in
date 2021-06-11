import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const { count } = await supabase.from('urls').select('id', { count: 'estimated' })

    res.setHeader('Cache-Control', 'max-age=86400')
    res.statusCode = 200
    res.json({
      success: true,
      urls: count || 0
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      urls: 0,
      error: error
    })
  }
}
