import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface Props {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput = ({ searchText, onSearchTextChange, onSearch }: Props) => {
  const placeholder =
    useBreakpointValue({ base: "Search", md: "Search games..." }) ??
    "Search games...";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <HStack
      flex="1"
      minW={0}
      maxW={{ base: "700px", md: "clamp(260px, 40vw, 520px)" }}
      paddingX={{ base: 0, md: 3 }}
      paddingY={0}
      height="40px"
      borderRadius="full"
      borderWidth="1px"
      borderColor="gray.200"
      _dark={{ borderColor: "whiteAlpha.300" }}
      _focusWithin={{
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
      }}
      width="100%"
      alignItems="center"
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <InputGroup
          flex="1"
          height="40px"
          display="flex"
          startElement={
            <Button
              type="submit"
              variant="ghost"
              padding={0}
              minW={0}
              aria-label="Search"
            >
              <Box as={FiSearch} aria-hidden color="fg.muted" />
            </Button>
          }
        >
          <Input
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            border="0"
            bg="transparent"
            height="40px"
            fontSize={{ base: "sm", md: "md" }}
            _focus={{ boxShadow: "none", outline: "none" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
          />
        </InputGroup>
      </form>
    </HStack>
  );
};

export default SearchInput;
