import useSWR from 'swr'

import { fetcher } from 'libs/fetcher'
import { apiIsAuth } from 'constants/paths'

import { IUser } from '../interfaces/IUser'

export interface IUseUser {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
}

function useUser (): IUseUser {
  const { data, error } = useSWR(apiIsAuth, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useUser
