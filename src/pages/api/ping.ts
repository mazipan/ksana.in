import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0')
  res.statusCode = 200

  const reqHeaders = {
    ...req.headers,
    'x-real-ip': null,
    'x-vercel-id': null,
    'x-vercel-forwarded-for': null,
    'x-vercel-ip-timezone': null,
    'x-vercel-proxied-for': null,
    'x-vercel-ip-latitude': null,
    'x-vercel-ip-longitude': null,
    'x-vercel-ip-country': null,
    'x-vercel-ip-city': null,
    'x-vercel-deployment-url': null,
    'x-vercel-proxy-signature': null,
    'x-forwarded-for': null,
    forwarded: null,
    host: null,
    'sec-ch-ua-mobile': null,
    'sec-fetch-site': null,
    'sec-fetch-dest': null,
    'cache-control': null,
    referer: null,
    'sec-ch-ua': null,
    'sec-ch-ua-platform': null,
    'x-forwarded-host': null,
    accept: null,
    'accept-language': null,
    'user-agent': null,
    'access-control-allow-origin': null,
    'x-matched-path': null,
    'if-none-match': null,
    'x-forwarded-proto': null,
    'x-vercel-ip-country-region': null,
    'sec-fetch-mode': null,
    'accept-encoding': null,
    'x-vercel-proxy-signature-ts': null,
    dnt: null,
    connection: null,
  }

  const nonBlankReqHeaders = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(reqHeaders).filter(([_, v]) => v != null)
  )

  res.json({
    message: 'Hello from Ksana.in',
    success: true,
    url: req.url || '',
    query: req.query || '',
    method: req.method || 'GET',
    body: req.body || {},
    headers: nonBlankReqHeaders
  })
}
