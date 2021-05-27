import React, { useContext } from 'react'
import { node } from 'prop-types'

import useUser from 'hooks/useUser'

const AuthContext: any = React.createContext({
  isLogin: false,
  user: null
})

export const useAuthContext: any = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
  const { user, isLoading } = useUser()

  return (
    <AuthContext.Provider value={{ user, isLogin: Boolean(!isLoading && user) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

AuthProvider.propTypes = {
  children: node.isRequired
}

export default AuthContext
