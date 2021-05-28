import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

export default async (req: any, res: any) => {
  try {
    const id: string | number = req.query.id
    const { slug } = req.body

    const { data, error } = await supabase
      .from('urls')
      .update({ slug: sanitizeSlug(slug) })
      .match({ id: id })

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
