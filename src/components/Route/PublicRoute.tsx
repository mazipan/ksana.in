import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { dashboard } from 'constants/paths'
import { useAuthContext } from 'context/Auth'
import { LoadingSpinner } from 'components/Loader/LoadingSpinner'

export function PublicRoute({ children, redirectPath = dashboard }: any) {
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

export default PublicRoute
