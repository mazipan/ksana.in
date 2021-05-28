import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const { email, password } = req.body
    const response: any = await supabase.auth.signIn({
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
