import { List } from '@chakra-ui/react'

import useUrls from 'hooks/useUrls'

import { IUrlListProps } from 'components/Dashboard/UrlList'
import { ErrorDataNotFound } from 'components/Error/ErrorDataNotFound'

import { IUrl } from 'interfaces/IUrl'

import { LoadingSkeleton } from './LoadingSkeleton'
import { Item } from './Item'

export function Items({ user, isFormVisible, onShowForm }: IUrlListProps) {
  const { data, isLoading } = useUrls(user?.id || '')

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <>
      {!isLoading && data && data.length > 0 ? (
        <List spacing={3}>
          {data.map((urlItem: IUrl) => (
            <Item data={urlItem} user={user} key={urlItem.id} />
          ))}
        </List>
      ) : (
        <>{!isFormVisible ? <ErrorDataNotFound useCta ctaAction={onShowForm} /> : null}</>
      )}
    </>
  )
}
