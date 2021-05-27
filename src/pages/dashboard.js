import { Stack } from '@chakra-ui/react'

import { LayoutAuth } from '../components/LayoutAuth'
import { Dashboard as DashboardContainer } from '../components/Dashboard'

const Dashboard = () => {
  return (
    <LayoutAuth height="100vh">
      <Stack
        spacing={8}
        mx={'auto'}
        mt="20"
        width={{ base: '100%', md: '4xl' }}
        py={12}
        px={6}
        as="section"
        align={'center'}
        justify={'center'}
      >
        <DashboardContainer />
      </Stack>
    </LayoutAuth>
  )
}

export default Dashboard
