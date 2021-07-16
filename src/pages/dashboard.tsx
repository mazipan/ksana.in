import { Stack } from '@chakra-ui/react'

import { LayoutAuth } from 'components/Layout/LayoutAuth'
import { Dashboard as DashboardContainer } from 'components/Dashboard'
import { MetaHead, NO_INDEXED } from 'components/MetaHead/MetaHead'

function Dashboard() {
  return (
    <LayoutAuth>
      <MetaHead title="Dashboard | Ksana.in" robots={NO_INDEXED} />
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

export { getServerSideProps } from '../Chakra'
