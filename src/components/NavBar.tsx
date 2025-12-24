import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "@/components/ColorModeSwitch";
import SearchInput from "@/components/SearchInput";

interface Props {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  onSearch: () => void;
}

const NavBar = ({ searchText, onSearchTextChange, onSearch }: Props) => {
  return (
    <HStack as="header" paddingX={4} paddingY={3} gap={4} width="100%">
      <Image src={logo} alt="Game Hub" boxSize="60px" objectFit="contain" />

      <Box flex="1" minW={0}>
        <SearchInput
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
          onSearch={onSearch}
        />
      </Box>

      <Box marginLeft="auto">
        <ColorModeSwitch />
      </Box>
    </HStack>
  );
};

export default NavBar;
