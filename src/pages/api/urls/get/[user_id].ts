import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const userId: string | number = req.query.user_id

    const { data: dataSelect, error: errorSelect } = await supabase
      .from('urls')
      .select('id,user_id,real_url,slug,hit')
      .eq('user_id', userId)

    // res.setHeader('Cache-Control', 'max-age=86400')
    res.statusCode = 200
    res.json({
      success: true,
      data: dataSelect,
      error: errorSelect
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      data: [],
      error: error
    })
  }
}
