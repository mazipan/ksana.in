import useSWR from 'swr'

import { fetcherWithAuth } from 'libs/fetcher'
import { apiIsAuth } from 'constants/paths'

function useUser() {
  const { data, error } = useSWR(apiIsAuth, fetcherWithAuth)

  const isLoading = !error && !data
  const isLogin = !isLoading && data && data.isLogin

  return {
    data: isLogin ? data : null,
    isLoading,
    isError: !isLoading && data && data.error
  }
}

export default useUser
