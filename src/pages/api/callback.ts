import { NextApiRequest, NextApiResponse } from 'next'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.json({
    success: true,
    request: _,
    data: []
  })
}
