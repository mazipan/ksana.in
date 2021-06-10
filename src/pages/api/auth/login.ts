import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body
    const response = await supabase.auth.signIn({
      email: email,
      password: password
    })

    res.statusCode = 200
    res.json({
      success: true,
      ...response
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error
    })
  }
}
