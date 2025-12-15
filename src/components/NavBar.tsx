import { Box, Button, HStack, Image, Input, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "@/components/ColorModeSwitch";

const NavBar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <HStack as="header" paddingX={4} paddingY={3} gap={4} width="100%">
      <Image src={logo} alt="Game Hub" boxSize="60px" objectFit="contain" />

      <HStack
        flex={{ base: isMobileSearchOpen ? "1" : "0", md: "1" }}
        maxW="700px"
        paddingX={{ base: isMobileSearchOpen ? 3 : 0, md: 3 }}
        paddingY={{ base: isMobileSearchOpen ? 2 : 0, md: 2 }}
        borderRadius="full"
        borderWidth={{ base: isMobileSearchOpen ? "1px" : "0", md: "1px" }}
        width={{ base: isMobileSearchOpen ? "100%" : "auto", md: "100%" }}
      >
        <Button
          display={{ base: "inline-flex", md: "none" }}
          variant="ghost"
          padding={0}
          minW={0}
          onClick={() => setIsMobileSearchOpen((v) => !v)}
        >
          <Box as={isMobileSearchOpen ? FiX : FiSearch} aria-hidden />
        </Button>

        <Box
          display={{ base: "none", md: "block" }}
          as={FiSearch}
          aria-hidden
          color="fg.muted"
        />
        <Input
          placeholder="Search games..."
          border="0"
          bg="transparent"
          paddingY={0}
          display={{ base: isMobileSearchOpen ? "block" : "none", md: "block" }}
          _focus={{ boxShadow: "none" }}
          _focusVisible={{ boxShadow: "none" }}
        />
      </HStack>

      <Spacer />

      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
