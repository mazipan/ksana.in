import useSWR from 'swr'

import { fetcher } from 'libs/fetcher'
import { apiUrlsGet } from 'constants/paths'

function useUrls(id: number) {
  const { data, error } = useSWR(apiUrlsGet(id), fetcher)

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: error
  }
}

export default useUrls
