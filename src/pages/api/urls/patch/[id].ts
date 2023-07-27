import { NextApiRequest, NextApiResponse } from 'next'

import { getSessionFromCookie, sendError401, sendError5xx, sendErrorSlugExist } from '../../_utils'
import { supabase } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'

const doUpdateData = async ({
  slug,
  realUrl,
  id,
  userId,
  res
}: {
  slug: string
  realUrl: string
  id: string
  userId: string
  res: NextApiResponse
}) => {
  const { data, error } = await supabase
    .from('urls')
    .update({
      slug: sanitizeSlug(slug),
      real_url: realUrl
    })
    .match({ id: id, user_id: userId })
    .select()

  const isError = error && Object.keys(error).length > 0

  if (isError) {
    res.statusCode = 400
  } else {
    res.statusCode = 200
  }

  return res.json({
    success: !isError,
    data: !isError ? data : null,
    error: isError ? error : null
  })
}
/**
 * To update certain url
 *
 * Required Params: user_id
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const { slug, realUrl } = req.body

    const { data: dataSession } = await getSessionFromCookie(req)

    const { data: existingData } = await supabase
      .from('urls')
      .select('id,user_id,real_url,slug')
      .eq('id', id)
      .limit(1)
      .single()

    if (existingData && existingData.user_id) {
      // Make sure the url is belong to the user session
      if (existingData.user_id === dataSession?.user?.id) {
        // We are not updating slug here
        // Since it's still the same
        if (sanitizeSlug(slug) === sanitizeSlug(existingData.slug)) {
          doUpdateData({ id, slug, realUrl, userId: dataSession?.user?.id || '', res })
        } else {
          // check the new slug availability
          const { error: errorRealSlug } = await supabase
            .from('urls')
            .select('slug')
            .eq('slug', sanitizeSlug(slug))
            .limit(1)
            .single()

          // if it's exist, we will get the error
          if (errorRealSlug) {
            return doUpdateData({ id, slug, realUrl, userId: dataSession?.user?.id || '', res })
          } else {
            sendErrorSlugExist(res)
            return
          }
        }
      } else {
        sendError401(res)
        return
      }
    } else {
      sendError401(res)
      return
    }
  } catch (error) {
    if (error instanceof Error) {
      sendError5xx(res, error)
    }
    sendError5xx(res, error as Error)
  }
}
