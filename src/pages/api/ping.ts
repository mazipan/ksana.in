import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0')
  res.statusCode = 200
  res.json({
    message: 'Hello from Ksana.in',
    success: true,
    url: req.url || '',
    query: req.query || '',
    method: req.method || 'GET',
    body: req.body || {},
    headers: req.headers || {}
  })
}
