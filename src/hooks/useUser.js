import useSWR from 'swr'

import { fetcher } from '../libs/fetcher'
import { apiIsAuth } from '../constants/paths'

function useUser () {
  const { data, error } = useSWR(apiIsAuth, fetcher)

  console.log(data);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useUser;
