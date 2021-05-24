import { useColorMode, IconButton } from "@chakra-ui/react";
import { HiMoon, HiSun } from "react-icons/hi";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Theme switcher"
      onClick={toggleColorMode}
      fontSize="20px"
      bgColor="orange.300"
      icon={isDark ? <HiMoon color="white" /> : <HiSun color="white" />}
    />
  );
};
