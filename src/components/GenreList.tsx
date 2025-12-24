import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  Skeleton,
} from "@chakra-ui/react";
import useGenres from "@/components/hooks/useGenres";
import type { Genre } from "@/components/hooks/useGenres";
import { FaReact } from "react-icons/fa";

interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre | null) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { genres, isLoading, error } = useGenres();

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>

      {error && null}

      {isLoading && (
        <List.Root listStyleType="none" paddingInlineStart={0}>
          {Array.from({ length: 10 }).map((_, index) => (
            <List.Item key={index} paddingY={1} paddingX={2} borderRadius="lg">
              <HStack width="100%" align="start">
                <Skeleton
                  boxSize="32px"
                  borderRadius="md"
                  flexShrink={0}
                  marginTop={1}
                />
                <Skeleton height="20px" flex="1" marginTop={2} />
              </HStack>
            </List.Item>
          ))}
        </List.Root>
      )}

      {!isLoading && !error && (
        <List.Root listStyleType="none" paddingInlineStart={0}>
          <List.Item
            paddingY={1}
            paddingX={2}
            borderRadius="lg"
            bg={!selectedGenre ? "gray.100" : undefined}
            borderWidth={!selectedGenre ? "1px" : undefined}
            borderColor={!selectedGenre ? "blue.500" : undefined}
            boxShadow={!selectedGenre ? "sm" : undefined}
            color={!selectedGenre ? "blue.600" : undefined}
            _dark={
              !selectedGenre
                ? {
                    bg: "gray.800",
                    color: "blue.400",
                    borderWidth: "1px",
                    borderColor: "blue.300",
                    boxShadow: "sm",
                  }
                : undefined
            }
          >
            <HStack width="100%" align="start">
              <Box
                boxSize="32px"
                flexShrink={0}
                marginTop={1}
                borderRadius="md"
                bg="gray.200"
                _dark={{ bg: "gray.700" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box as={FaReact} aria-hidden boxSize="18px" />
              </Box>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                flex="1"
                fontWeight={!selectedGenre ? "bold" : "normal"}
                bg="transparent"
                color="inherit"
                whiteSpace="normal"
                textAlign="left"
                height="auto"
                paddingY={2}
                onClick={() => onSelectGenre(null)}
              >
                All Genres
              </Button>
            </HStack>
          </List.Item>
          {genres.map((genre) => (
            <List.Item
              key={genre.id}
              paddingY={1}
              paddingX={2}
              borderRadius="lg"
              bg={genre.id === selectedGenre?.id ? "gray.100" : undefined}
              borderWidth={genre.id === selectedGenre?.id ? "1px" : undefined}
              borderColor={
                genre.id === selectedGenre?.id ? "blue.500" : undefined
              }
              boxShadow={genre.id === selectedGenre?.id ? "sm" : undefined}
              _dark={{
                bg: genre.id === selectedGenre?.id ? "gray.800" : undefined,
                color: genre.id === selectedGenre?.id ? "blue.400" : undefined,
                borderColor:
                  genre.id === selectedGenre?.id ? "blue.300" : undefined,
              }}
            >
              <HStack width="100%" align="start">
                {genre.image_background && (
                  <Image
                    src={genre.image_background}
                    boxSize="32px"
                    borderRadius="md"
                    objectFit="cover"
                    flexShrink={0}
                    marginTop={1}
                  />
                )}
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  flex="1"
                  fontWeight={
                    genre.id === selectedGenre?.id ? "bold" : "normal"
                  }
                  bg="transparent"
                  color="inherit"
                  whiteSpace="normal"
                  textAlign="left"
                  height="auto"
                  paddingY={2}
                  onClick={() => onSelectGenre(genre)}
                >
                  {genre.name}
                </Button>
              </HStack>
            </List.Item>
          ))}
        </List.Root>
      )}
    </>
  );
};

export default GenreList;
