import { createContext, ReactNode, useContext } from 'react'
import { node } from 'prop-types'

import useUser from 'hooks/useUser'
import { IUser } from 'interfaces/IUser'
export interface IAuthContext {
  isLoading: boolean
  isLogin: boolean
  user: IUser | null
}

const AuthContext = createContext<IAuthContext>({
  isLoading: true,
  isLogin: false,
  user: null
})

export interface IAuthProviderProps {
  children: ReactNode
}

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { data, isLoading } = useUser()

  return (
    <AuthContext.Provider
      value={{ user: data, isLoading, isLogin: Boolean(!isLoading && data && data.isLogin) }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

AuthProvider.propTypes = {
  children: node.isRequired
}

export default AuthContext
