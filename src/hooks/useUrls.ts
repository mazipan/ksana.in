import useSWR from 'swr'

import { fetcherWithAuth } from 'libs/fetcher'
import { apiUrlsGet } from 'constants/paths'

function useUrls() {
  const { data, error } = useSWR(apiUrlsGet(), fetcherWithAuth)

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useUrls
