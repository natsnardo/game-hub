import {
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGenres from "@/components/hooks/useGenres";
import type { Genre } from "@/components/hooks/useGenres";

interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { genres, isLoading, error } = useGenres();

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>

      {error && <Text color="red.500">{error}</Text>}

      {isLoading && <Spinner />}

      {!isLoading && !error && (
        <VStack align="stretch">
          {genres.map((genre) => (
            <HStack key={genre.id} paddingY={1}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </Button>
            </HStack>
          ))}
        </VStack>
      )}
    </>
  );
};

export default GenreList;
