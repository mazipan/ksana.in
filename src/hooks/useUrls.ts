import useSWR from 'swr'

import { fetcherWithAuth } from 'libs/fetcher'
import { apiUrlsGet } from 'constants/paths'

function useUrls(id: string) {
  const { data, error } = useSWR(id ? apiUrlsGet(id) : null, fetcherWithAuth)

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useUrls
