import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const id: string | number = req.query.id
    const { data, error } = await supabase.from('urls').delete().match({ id: id })

    res.statusCode = 200
    res.json({
      success: true,
      data: data,
      error: error
    })
  } catch (error) {
    res.statusCode = 500
    res.json({
      success: false,
      data: null,
      error: error
    })
  }
}
