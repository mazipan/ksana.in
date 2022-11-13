import { NextApiResponse } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'

export const sendError5xx = (res: NextApiResponse, error: Error): boolean => {
  res.statusCode = 500
  res.json({
    success: false,
    data: null,
    error: error
  })

  return false
}

export const sendError401 = (res: NextApiResponse): boolean => {
  res.statusCode = 401
  res.json({
    success: false,
    data: null,
    error: {
      message: 'You have no authorization to perform this action'
    }
  })

  return false
}

export const sendErrorSlugExist = (res: NextApiResponse): boolean => {
  res.statusCode = 400
  res.json({
    success: false,
    data: null,
    error: {
      message: 'The slug you are trying to save is exist'
    }
  })

  return false
}

export const setStatusCode = (res: NextApiResponse, error?: any) => {
  if (error) {
    res.statusCode = 400
  } else {
    res.statusCode = 200
  }
}

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}
