import useSWR from 'swr'

import { fetcher } from 'libs/fetcher'
import { apiUrlsGet } from 'constants/paths'

function useUrls(id: string) {
  const { data, error } = useSWR(id ? apiUrlsGet(id) : null, fetcher)

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useUrls
