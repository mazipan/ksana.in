import { supabase } from '../../../libs/supabase'

export default async (req, res) => {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    res.statusCode = 200
    res.json({
      success: true,
      data: {
        isLogin: !!user,
        user: user || null
      }
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      error: error,
      data: {
        isLogin: false,
        user: null
      }
    })
  }
}
