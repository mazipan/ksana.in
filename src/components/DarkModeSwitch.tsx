import { useColorMode, IconButton } from '@chakra-ui/react'
import { HiMoon, HiSun } from 'react-icons/hi'

export function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark: string | boolean = colorMode === 'dark'

  return (
    <IconButton
      aria-label="Theme switcher"
      onClick={toggleColorMode}
      fontSize="20px"
      borderRadius="md"
      bgColor="orange.300"
      _hover={{
        bg: 'orange.500'
      }}
      icon={isDark ? <HiSun color="white" /> : <HiMoon color="white" />}
    />
  )
}
