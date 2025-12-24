import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "@/components/hooks/useGames";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/GameCardSkeleton";

interface Props {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

const GameGrid = ({ genreId, platformId, sortOrder, searchText }: Props) => {
  const { games, isLoading, error } = useGames({
    genreId,
    platformId,
    sortOrder,
    searchText,
  });

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      {isLoading && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          gap={6}
          padding={4}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      )}

      {!isLoading && !error && (
        <>
          {games.length === 0 ? (
            <Center minHeight="50vh" padding={4}>
              <Text color="fg.muted">No results found.</Text>
            </Center>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              gap={6}
              padding={4}
            >
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </>
  );
};

export default GameGrid;
