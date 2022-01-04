/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from 'libs/supabase'

const checkUserTable = async (uuid: string) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_id', uuid)

    if (!error) {
      // add user if not exists
      if (!data?.length) {
        await supabase.from('users').insert([
          {
            user_id: uuid
          }
        ])
      }
    } else {
      console.error('[Error] ../api/auth/is-authenticated:1', error.message)
    }
  } catch (error) {
    console.error('[Error] ../api/auth/is-authenticated:2', error)
  }
}

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

    if (user?.id) checkUserTable(user.id)

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
