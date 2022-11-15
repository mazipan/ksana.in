import { ChangeEvent, useState, useEffect } from 'react'
import { SimpleGrid, Flex, ButtonGroup, IconButton, Text, Button } from '@chakra-ui/react'

import { HiViewGrid, HiViewList } from 'react-icons/hi'

import { LoadingSkeleton } from './LoadingSkeleton'
import { SearchInput } from './SearchInput'
import { Item } from './Item'
import { TotalStats } from './TotalStats'
import useUrls from 'hooks/useUrls'

import { IUrlListProps } from 'components/Dashboard/UrlList'
import { ErrorDataNotFound } from 'components/Error/ErrorDataNotFound'

import { IUrl } from 'interfaces/IUrl'
import { paginate } from '~/libs/helpers'

export const VIEW = {
  GRID: 'grid',
  LIST: 'list'
}

export function Items({ user, isFormVisible, onShowForm }: IUrlListProps) {
  const { data, isLoading = true } = useUrls()

  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [view, setView] = useState<string>(VIEW.LIST)
  const [filteredData, setFilteredData] = useState<IUrl[]>(data)

  const isGrid = view === VIEW.GRID

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      if (searchText === '') {
        const paginated = paginate(data, page)
        setFilteredData(paginated.pagedItems)
        setTotalPage(paginated.totalPages)
      } else if (searchText && searchText.length > 1) {
        const foundData = data.filter((d: IUrl) => {
          const containUrl = d.real_url.toLowerCase().includes(searchText.toLowerCase())
          const containSlug = d.slug.toLowerCase().includes(searchText.toLowerCase())
          return containSlug || containUrl
        })
        setPage(1)
        const paginated = paginate(foundData, 1)
        setFilteredData(paginated.pagedItems)
        setTotalPage(paginated.totalPages)
      }
    }
  }, [isLoading, searchText, data, page])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleToggleView = () => {
    setView(isGrid ? VIEW.LIST : VIEW.GRID)
  }

  return (
    <>
      {!isLoading && data && data.length > 0 ? (
        <>
          <TotalStats data={data} />
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            <ButtonGroup spacing="2" variant="outline">
              <IconButton
                size="md"
                borderRadius="md"
                bg={'orange.400'}
                _hover={{
                  bg: 'orange.500'
                }}
                _focus={{
                  bg: 'orange.500'
                }}
                aria-label={isGrid ? 'Toggle List View' : 'Toggle Grid View'}
                onClick={handleToggleView}
                icon={isGrid ? <HiViewGrid color="white" /> : <HiViewList color="white" />}
              />
            </ButtonGroup>
            <SearchInput onChangeSearch={handleSearch} searchText={searchText} />
          </Flex>
          {filteredData.length > 0 ? (
            <>
              <SimpleGrid columns={isGrid ? 2 : 1} spacing={2}>
                {filteredData.map((urlItem: IUrl) => (
                  <Item data={urlItem} user={user} key={urlItem.id} />
                ))}
              </SimpleGrid>
              <Flex justifyContent="space-between" alignItems="center">
                <Button
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1)
                    }
                  }}
                  color={'white'}
                  bg={'orange.400'}
                  _hover={{
                    bg: 'orange.500'
                  }}
                  _focus={{
                    bg: 'orange.500'
                  }}
                  borderRadius="md"
                >
                  Prev
                </Button>
                <Text>{page}</Text>
                <Button
                  onClick={() => {
                    if (page < totalPage) {
                      setPage(page + 1)
                    }
                  }}
                  color={'white'}
                  bg={'orange.400'}
                  _hover={{
                    bg: 'orange.500'
                  }}
                  _focus={{
                    bg: 'orange.500'
                  }}
                  borderRadius="md"
                >
                  Next
                </Button>
              </Flex>
            </>
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
