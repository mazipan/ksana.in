import { ReactNode } from 'react'
import { node } from 'prop-types'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { dashboard } from 'constants/paths'
import { useAuthContext } from 'context/Auth'
import { LoadingSpinner } from 'components/Loader/LoadingSpinner'

export interface IPublicRouteProps {
  children: ReactNode
  redirectPath: string
}

export function PublicRoute({ children, redirectPath }: IPublicRouteProps) {
  const router = useRouter()
  const { isLoading, isLogin } = useAuthContext()

  if (isLoading) {
    return (
      <Box width={{ base: '100%' }}>
        <Flex justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </Box>
    )
  }

  if (!isLoading && isLogin) {
    router.push(redirectPath)
  }

  return <>{children}</>
}

PublicRoute.propTypes = {
  children: node.isRequired
}

PublicRoute.defaultProps = {
  redirectPath: dashboard
}

export default PublicRoute
