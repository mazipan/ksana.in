import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const userId: string = req.query.user_id

    const { data, error } = await supabase
      .from('urls')
      .select('id,user_id,real_url,slug,hit,updated_at')
      .eq('user_id', userId)
      .order('id', { ascending: false })

    if (error) {
      res.statusCode = 400
      res.json({
        success: false,
        data: [],
        error: error
      })
    } else {
      res.statusCode = 200
      res.json({
        success: true,
        data: data
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      data: [],
      error: error
    })
  }
}
