import {
  IconButton,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Stack
} from '@chakra-ui/react'
import { HiShare } from 'react-icons/hi'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

import { getMeta } from 'libs/oge'

type SharePopoverProps = {
  url: string
}

const SharePopover = ({ url }: SharePopoverProps) => {
  const [isLoadingShare, setLoadingShare] = useState<boolean>(false)
  const [showShare, setShowShare] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const parsedUrl = encodeURIComponent(url)

  const handleShare = async (url: string) => {
    setLoadingShare(true)
    const d = await getMeta(url)
    setText(encodeURIComponent(d.description))
    setShowShare(true)
    setLoadingShare(false)
  }

  return (
    <Popover
      isOpen={showShare}
      onClose={() => {
        setShowShare(false)
      }}
      isLazy
      placement="bottom"
    >
      <PopoverTrigger>
        <IconButton
          onClick={() => {
            handleShare(url)
          }}
          aria-label="Share url"
          fontSize="20px"
          variant="ghost"
          borderRadius="md"
          isLoading={isLoadingShare}
          icon={<HiShare color="#ED8936" />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Bagikan tautan anda</PopoverHeader>
        <PopoverBody>
          <Stack direction="row" justifyContent="center">
            <Link isExternal href={`https://api.whatsapp.com/send?text=${text}+%0A+${parsedUrl}`}>
              <IconButton
                borderRadius="md"
                colorScheme="green"
                aria-label="Share whatsapp"
                icon={<FaWhatsapp />}
              />
            </Link>
            <Link
              isExternal
              href={`https://twitter.com/intent/tweet?text=${text}+%0A+${parsedUrl}`}
            >
              <IconButton
                borderRadius="md"
                colorScheme="twitter"
                aria-label="Share twitter"
                icon={<FaTwitter />}
              />
            </Link>
            <Link
              isExternal
              href={`https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${parsedUrl}`}
            >
              <IconButton
                borderRadius="md"
                colorScheme="facebook"
                aria-label="Share Facebook"
                icon={<FaFacebook />}
              />
            </Link>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SharePopover
