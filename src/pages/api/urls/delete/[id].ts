import { supabase } from 'libs/supabase'

export default async (req: any, res: any) => {
  try {
    const id: string = req.query.id
    const { data, error } = await supabase.from('urls').delete().match({ id: id })

    if (error) {
      res.statusCode = 400
      res.json({
        success: false,
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
      data: null,
      error: error
    })
  }
}
