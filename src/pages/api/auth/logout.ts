import { NextApiRequest, NextApiResponse } from 'next'

import { deleteCookie } from 'cookies-next'
import { supabase } from 'libs/supabase'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '~/constants/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await supabase.auth.signOut()
    // Reset cookie
    deleteCookie(COOKIE_REFRESH_TOKEN, { req, res })
    deleteCookie(COOKIE_ACCESS_TOKEN, { req, res })
    res.statusCode = 200
    res.json({
      success: true,
      ...response
    })
  } catch (error) {
    console.error('[LOGOUT]', error)
    res.statusCode = 500
    res.json({
      success: false,
      error: error
    })
  }
}
