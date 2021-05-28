import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    res.statusCode = 200
    res.json({
      success: true,
      isLogin: !!user,
      error,
      ...user,
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error,
      isLogin: false,
    })
  }
}
