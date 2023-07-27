import { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '~/constants/common'
import { supabase } from '~/libs/supabase'

export const sendError5xx = (res: NextApiResponse, error: Error): boolean => {
  res.statusCode = 500
  res.json({
    success: false,
    data: null,
    error: error
  })

  console.error('[500]', error)

  return false
}

export const sendError401 = (res: NextApiResponse): boolean => {
  console.error('[401]')
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
  console.error('[400]')
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

export const getSessionFromCookie = async (req: NextApiRequest) => {
  const cookies = req.cookies
  const accessToken = cookies[COOKIE_ACCESS_TOKEN] || ''
  const refreshToken = cookies[COOKIE_REFRESH_TOKEN] || ''

  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken
    })

    if (!error && data) {
      return { data, error }
    }

    return { data: null, error }
  }

  return { data: null, error: 'Session not found' }
}
