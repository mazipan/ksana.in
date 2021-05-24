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
      icon={isDark ? <HiMoon color="grey" /> : <HiSun color="grey" />}
    />
  );
};
