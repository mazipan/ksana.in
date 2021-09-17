import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'libs/supabase'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const { count: countUrls } = await supabase.from('urls').select('id', { count: 'estimated' })
    const { count: countUsers } = await supabase.from('users').select('id', { count: 'estimated' })

    res.setHeader('Cache-Control', 'max-age=86400')
    res.statusCode = 200
    res.json({
      success: true,
      urls: countUrls || 0,
      users: countUsers || 0
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      urls: 0,
      users: 0,
      error: error
    })
  }
}
