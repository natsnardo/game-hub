import { Box, Grid, Image, Spinner, Text } from "@chakra-ui/react";
import useGames from "@/components/hooks/useGames";

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
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          padding={4}
        >
          {games.map((game) => (
            <Box
              key={game.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              {game.background_image && (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
              )}
              <Box padding={3}>
                <Text fontWeight="semibold">{game.name}</Text>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </>
  );
};

export default GameGrid;
