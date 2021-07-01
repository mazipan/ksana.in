import dynamic from 'next/dynamic'
import { ChangeEvent, useState } from 'react'
import { mutate } from 'swr'
import {
  Link,
  Text,
  ListItem,
  Input,
  IconButton,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'
import { HiShare, HiDuplicate, HiPencil, HiTrash, HiSave, HiCheck } from 'react-icons/hi'

import { deleteUrl, patchSlug } from 'libs/supabase'
import { sanitizeSlug } from 'libs/helpers'
import { getMeta } from 'libs/oge'

import { useAlertContext } from 'context/Alert'

import { HOME, apiUrlsGet } from 'constants/paths'

import { IUser } from 'interfaces/IUser'
import { IUrl } from 'interfaces/IUrl'

import SharePopover from './SharePopover'

const copy: any = dynamic((): any => import('copy-to-clipboard'), { ssr: false })

export interface IUrlItemProps {
  user: IUser
  data: IUrl
}

export function Item({ user, data }: IUrlItemProps) {
  const { showAlert, hideAlert } = useAlertContext()
  const [updateId, setUpdateId] = useState<string>('')
  const [updateSlug, setUpdateSlug] = useState<string>('')
  const [isSuccessCopy, setSuccessCopy] = useState<boolean>(false)
  const [isLoadingShare, setLoadingShare] = useState<boolean>(false)
  const [isLoadingSave, setLoadingSave] = useState<boolean>(false)
  const isSupportShare: boolean =
    typeof window !== 'undefined' ? navigator.share !== undefined : false

  const bgBox = useColorModeValue('white', 'gray.800')
  const bgInput = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

  const showSuccessCopy = () => {
    setSuccessCopy(true)
    setTimeout(() => {
      setSuccessCopy(false)
    }, 2000)
  }

  const handleCopy = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    } else {
      copy(text)
    }
    showSuccessCopy()
  }

  const handleShare = async (url: string) => {
    if (navigator.share) {
      setLoadingShare(true)
      const jsonRes = await getMeta(url)

      const shareObj = {
        title: jsonRes.title,
        text: jsonRes.description,
        url: url
      }

      navigator
        .share(shareObj)
        // eslint-disable-next-line no-console
        .then(() => setLoadingShare(false))
        .catch((error) => {
          setLoadingShare(false)
          // eslint-disable-next-line no-console
          console.error('Error sharing', error, shareObj)
        })
    }
  }

  const handleClickEdit = async (id: string) => {
    if (updateId === id) {
      setUpdateId('')
      setUpdateSlug('')
    } else {
      setUpdateId(id)
      setUpdateSlug('')
    }
  }

  const handleChangeUpdatedSlug = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUpdateSlug(value)
  }

  const handleClickSave = async () => {
    if (updateSlug) {
      setLoadingSave(true)
      const { error } = await patchSlug({
        id: updateId,
        slug: sanitizeSlug(updateSlug),
        userId: user?.id
      })

      if (error) {
        showAlert({
          title: 'Terjadi galat pada saat memperbarui data',
          message: `Pesan: ${error.message}`,
          onClose: () => {
            hideAlert()
            setLoadingSave(false)
          }
        })
      } else {
        mutate(apiUrlsGet(user?.id))
        setUpdateId('')
        setUpdateSlug('')
        setLoadingSave(false)
      }
    }
  }

  const onConfimDelete = async (id: string) => {
    const { error } = await deleteUrl({ id: id, userId: user?.id })

    if (error) {
      hideAlert()

      showAlert({
        title: 'Terjadi galat pada saat berusaha menghapus data',
        message: `Pesan: ${error.message}`,
        onClose: () => {
          hideAlert()
        }
      })
    }

    hideAlert()
    mutate(apiUrlsGet(user?.id))
  }

  const handleDelete = async (id: string, slug: string) => {
    showAlert({
      title: 'Konfirmasi hapus',
      message: `Apakah kamu yakin untuk menghapus data ${HOME}${slug}? Aksi ini juga akan menghilangkan semua data statistik terkait.`,
      cancelText: 'Batalkan',
      confirmText: 'Ya, hapus',
      onConfirm: () => {
        onConfimDelete(id)
      },
      onClose: hideAlert
    })
  }

  return (
    <ListItem
      key={data.slug}
      w={'full'}
      bg={bgBox}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
    >
      <Link
        as="a"
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="700"
        color="orange.400"
        href={`${HOME}${data.slug}`}
        mb="4"
        display="block"
      >
        {`${HOME}${data.slug}`}
      </Link>

      {updateId && updateId === data.id && (
        <HStack alignItems="center" mb="4" mt="2">
          <Input
            size="lg"
            name="slug"
            placeholder={'Tulis slug baru'}
            bg={bgInput}
            border={0}
            value={updateSlug}
            onChange={handleChangeUpdatedSlug}
          />

          <IconButton
            onClick={handleClickSave}
            aria-label="Simpan slug"
            size="lg"
            bg="orange.400"
            borderRadius="md"
            isLoading={isLoadingSave}
            icon={<HiSave color="#FFF" />}
          />
        </HStack>
      )}

      <Text fontSize="small" color="gray.400" display="block" mb="2">
        {data.real_url}
      </Text>
      <Text fontSize="small" color="gray.400">
        Telah{` `}
        <Text as="span" fontWeight="bold">
          {new Intl.NumberFormat('id-ID').format(data.hit)}
        </Text>
        {` `}kali dikunjungi
      </Text>
      <HStack spacing={2} mt={4}>
        <IconButton
          onClick={() => {
            handleCopy(`${HOME}${data.slug}`)
          }}
          aria-label="Copy"
          fontSize="20px"
          variant="ghost"
          borderRadius="md"
          icon={isSuccessCopy ? <HiCheck color="#48BB78" /> : <HiDuplicate color="#ED8936" />}
        />
        {isSupportShare ? (
          <IconButton
            onClick={() => {
              handleShare(`${HOME}${data.slug}`)
            }}
            aria-label="Copy"
            fontSize="20px"
            variant="ghost"
            borderRadius="md"
            isLoading={isLoadingShare}
            icon={<HiShare color="#ED8936" />}
          />
        ) : (
          <SharePopover url={`${HOME}${data.slug}`} />
        )}
        <IconButton
          onClick={() => {
            handleClickEdit(data.id)
          }}
          aria-label="Ubah"
          fontSize="20px"
          variant="ghost"
          borderRadius="md"
          icon={<HiPencil color="#ED8936" />}
        />
        <IconButton
          onClick={() => {
            handleDelete(data.id, data.slug)
          }}
          aria-label="Hapus"
          fontSize="20px"
          variant="ghost"
          borderRadius="md"
          icon={<HiTrash color="#ED8936" />}
        />
      </HStack>
    </ListItem>
  )
}
