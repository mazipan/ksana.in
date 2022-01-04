import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'libs/supabase'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const { count: countUrls } = await supabase.from('urls').select('id', { count: 'estimated' })

    // const { data: countUsers } = await supabase.rpc(
    //   'get_users'
    // )

    res.setHeader('Cache-Control', 'max-age=86400')
    res.statusCode = 200
    res.json({
      success: true,
      urls: countUrls || 1,
      users: 300
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      urls: 1,
      users: 1,
      error: error
    })
  }
}
