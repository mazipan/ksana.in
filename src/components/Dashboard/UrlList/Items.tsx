import { ChangeEvent, useState , useEffect } from 'react'
import { List } from '@chakra-ui/react'

import useUrls from 'hooks/useUrls'

import { IUrlListProps } from 'components/Dashboard/UrlList'
import { ErrorDataNotFound } from 'components/Error/ErrorDataNotFound'

import { IUrl } from 'interfaces/IUrl'

import { LoadingSkeleton } from './LoadingSkeleton'
import { SearchInput } from './SearchInput'
import { Item } from './Item'
import { TotalStats } from './TotalStats'

export function Items({ user, isFormVisible, onShowForm }: IUrlListProps) {
  const { data, isLoading = true } = useUrls(user?.id || '')
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<IUrl[]>(data)

  useEffect(() => {
    if (!isLoading) {
      if (searchText === '') {
        setFilteredData(data)
      } else if (searchText && searchText.length > 1) {
        const foundData = data.filter((d: IUrl) => {
          const containUrl = d.real_url.toLowerCase().includes(searchText.toLowerCase())
          const containSlug = d.slug.toLowerCase().includes(searchText.toLowerCase())
          return containSlug || containUrl
        })
        setFilteredData(foundData)
      }
    }
  }, [isLoading, searchText, data])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <>
      {!isLoading && data && data.length > 0 ? (
        <>
          <TotalStats data={data} />
          <SearchInput onChangeSearch={handleSearch} searchText={searchText} />
          {filteredData.length > 0 ? (
            <List spacing={3}>
              {filteredData.map((urlItem: IUrl) => (
                <Item data={urlItem} user={user} key={urlItem.id} />
              ))}
            </List>
          ) : (
            <ErrorDataNotFound
              useCta={false}
              title="Tidak menemukan apapun nih, coba kata kunci lain!"
            />
          )}
        </>
      ) : (
        <>{!isFormVisible ? <ErrorDataNotFound useCta ctaAction={onShowForm} /> : null}</>
      )}
    </>
  )
}
