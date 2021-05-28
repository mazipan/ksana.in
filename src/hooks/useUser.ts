import useSWR from 'swr'

import { fetcher } from 'libs/fetcher'
import { apiIsAuth } from 'constants/paths'

function useUser() {
  const { data, error } = useSWR(apiIsAuth, fetcher)

  const isLoading = !error && !data
  const isLogin = !isLoading && data && data.isLogin
  const isErrorData = !isLoading && data && data.error && data.error.message

  return {
    data: isLogin ? data : null,
    isLoading,
    isError: Boolean(error || isErrorData)
  }
}

export default useUser
