import React, { useContext } from 'react'
import { node } from 'prop-types'
import useUser from '../hooks/useUser'

const AuthContext = React.createContext({
  isLogin: false,
  user: null
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
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
