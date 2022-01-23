import { ChangeEvent, useState, useEffect } from 'react'
import { SimpleGrid, Flex, ButtonGroup, IconButton } from '@chakra-ui/react'

import { HiViewGrid, HiViewList } from 'react-icons/hi'

import { LoadingSkeleton } from './LoadingSkeleton'
import { SearchInput } from './SearchInput'
import { Item } from './Item'
import { TotalStats } from './TotalStats'
import useUrls from 'hooks/useUrls'

import { IUrlListProps } from 'components/Dashboard/UrlList'
import { ErrorDataNotFound } from 'components/Error/ErrorDataNotFound'

import { IUrl } from 'interfaces/IUrl'

export const VIEW = {
  GRID: 'grid',
  LIST: 'list'
}

export function Items({ user, isFormVisible, onShowForm }: IUrlListProps) {
  const { data, isLoading = true } = useUrls(user?.id || '')
  const [searchText, setSearchText] = useState<string>('')
  const [view, setView] = useState<string>(VIEW.LIST)
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

  const isGrid = view === VIEW.GRID
  const isList = view === VIEW.LIST

  const handleViewGrid = () => {
    setView(VIEW.GRID)
  }

  const handleViewList = () => {
    setView(VIEW.LIST)
  }

  return (
    <>
      {!isLoading && data && data.length > 0 ? (
        <>
          <TotalStats data={data} />
          <SearchInput onChangeSearch={handleSearch} searchText={searchText} />
          <Flex justifyContent="flex-end" alignItems="center">
            <ButtonGroup spacing="2" variant="outline">
              <IconButton
                variant="outline"
                borderColor={'orange.400'}
                color="orange.400"
                _hover={{
                  bg: 'orange.200'
                }}
                _focus={{
                  bg: 'orange.200'
                }}
                _active={{
                  bg: 'orange.400',
                  color: 'white'
                }}
                aria-label="View Grid"
                isActive={isGrid}
                onClick={handleViewGrid}
                icon={<HiViewGrid />}
              />
              <IconButton
                variant="outline"
                borderColor={'orange.400'}
                color="orange.400"
                _hover={{
                  bg: 'orange.200'
                }}
                _focus={{
                  bg: 'orange.200'
                }}
                _active={{
                  bg: 'orange.400',
                  color: 'white'
                }}
                aria-label="View List"
                isActive={isList}
                onClick={handleViewList}
                icon={<HiViewList />}
              />
            </ButtonGroup>
          </Flex>
          {filteredData.length > 0 ? (
            <SimpleGrid columns={isGrid ? 2 : 1} spacing={2}>
              {filteredData.map((urlItem: IUrl) => (
                <Item data={urlItem} user={user} key={urlItem.id} />
              ))}
            </SimpleGrid>
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
