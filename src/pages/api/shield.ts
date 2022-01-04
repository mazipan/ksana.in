import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'libs/supabase'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const { count: countUrls } = await supabase.from('urls').select('id', { count: 'estimated' })

    res.setHeader('Cache-Control', 'max-age=86400')
    res.statusCode = 200
    res.json({
      schemaVersion: 1,
      label: 'Shortened URLs',
      message: `${countUrls || 0}`,
      color: 'orange',
      cacheSeconds: 86400,
      style: 'flat-square'
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      schemaVersion: 1,
      label: 'Shortened URLs',
      message: '0',
      color: 'orange',
      isError: true,
      cacheSeconds: 3600,
      style: 'flat-square'
    })
  }
}
