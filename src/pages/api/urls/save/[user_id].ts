import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

export default async (req: any, res: any) => {
  try {
    const { url, slug, userId } = req.body
    const { data, error } = await supabase.from('urls').insert([
      {
        real_url: url,
        slug: sanitizeSlug(slug),
        user_id: userId
      }
    ])

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
      data: [],
      error: error
    })
  }
}
