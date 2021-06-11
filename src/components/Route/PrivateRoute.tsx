import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { login } from 'constants/paths'
import { useAuthContext } from 'context/Auth'
import { IUser } from 'interfaces/IUser'
import { LoadingSpinner } from 'components/Loader/LoadingSpinner'

export interface IPrivateRouteProps {
  component(props: { user: IUser | null }): ReactElement
  redirectPath: string
}

export function PrivateRoute({ component: Component, redirectPath }: IPrivateRouteProps) {
  const router = useRouter()
  const { user, isLoading, isLogin } = useAuthContext()

  if (isLoading) {
    return (
      <Box width={{ base: '100%' }}>
        <Flex justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </Box>
    )
  }

  if (!isLoading && !isLogin) {
    router.push(redirectPath)
  }

  return <Component user={user} />
}

PrivateRoute.defaultProps = {
  redirectPath: login
}

export default PrivateRoute
