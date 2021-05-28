import { supabase } from 'libs/supabase'

export default async (_: any, res: any) => {
  try {
    const response: any = await supabase.auth.signOut()
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
