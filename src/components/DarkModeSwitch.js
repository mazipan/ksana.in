import { useColorMode, Switch } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      colorScheme="purple"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
