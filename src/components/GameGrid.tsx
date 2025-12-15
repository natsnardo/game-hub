import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useGames from "@/components/hooks/useGames";
import GameCard from "@/components/GameCard";

const GameGrid = () => {
  const { games, isLoading, error } = useGames();

  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && (
        <Box display="flex" justifyContent="center" paddingY={10}>
          <Spinner />
        </Box>
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
