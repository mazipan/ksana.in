import React, { useContext } from 'react'
import { node } from 'prop-types'

import useUser from 'hooks/useUser'

const AuthContext: any = React.createContext({
  isLoading: true,
  isLogin: false,
  user: null
})

export const useAuthContext: any = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
  const { data, isLoading } = useUser()

  return (
    <AuthContext.Provider value={{ user: data, isLoading, isLogin: Boolean(!isLoading && data && data.isLogin) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

AuthProvider.propTypes = {
  children: node.isRequired
}

export default AuthContext
