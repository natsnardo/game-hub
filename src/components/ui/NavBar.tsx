import {
  Box,
  HStack,
  IconButton,
  Image,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FiMoon, FiSearch, FiSun } from "react-icons/fi";
import logo from "../../assets/logo.webp";

const NavBar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <HStack as="header" paddingX={4} paddingY={3} gap={4} width="100%">
      <Image src={logo} alt="Game Hub" boxSize="60px" objectFit="contain" />

      <HStack
        flex="1"
        maxW="700px"
        paddingX={3}
        paddingY={2}
        borderRadius="full"
        borderWidth="1px"
      >
        <Box as={FiSearch} aria-hidden color="fg.muted" />
        <Input
          placeholder="Search games..."
          border="0"
          bg="transparent"
          paddingY={0}
          _focusVisible={{ boxShadow: "none" }}
        />
      </HStack>

      <Spacer />

      <IconButton
        aria-label="Toggle color mode"
        variant="ghost"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <Box as={isDark ? FiSun : FiMoon} />
      </IconButton>
    </HStack>
  );
};

export default NavBar;
