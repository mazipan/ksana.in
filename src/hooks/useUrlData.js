import { useEffect, useState } from 'react'

import { supabase } from '../libs/supabase'

export const useUrlData = (userId = '') => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let getDataHandler = () => setData
    let getErrorHandler = () => setError;

    (async () => {
      if (userId) {
        try {
          const { data: dataSelect, error: errorSelect } = await supabase
            .from('urls')
            .select('id,user_id,real_url,slug,hit')
            .eq('user_id', userId)

          if (!errorSelect) {
            getDataHandler()(dataSelect || [])
          } else {
            getErrorHandler()(errorSelect)
          }
        } catch (err) {
          getErrorHandler()(err)
        }
      }
    })()

    return () => {
      getDataHandler = () => () => {} // return noop function, prevent old request from updating state
      getErrorHandler = () => () => {} // return noop function, prevent old request from updating state
    }
  }, [userId])

  return {
    data,
    error
  }
}
