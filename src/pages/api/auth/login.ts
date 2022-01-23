/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body
    const { session, user, error } = await supabase.auth.signIn({
      email: email,
      password: password
    })

    if (error) {
      res.statusCode = 400
    } else {
      res.statusCode = 200
    }

    res.json({
      success: true,
      session,
      user,
      error
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error
    })
  }
}
