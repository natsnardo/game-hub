import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "@/components/hooks/useGames";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/GameCardSkeleton";

const GameGrid = () => {
  const { games, isLoading, error } = useGames();

  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
          gap={6}
          padding={4}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      )}

      {!isLoading && !error && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
          gap={6}
          padding={4}
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default GameGrid;
