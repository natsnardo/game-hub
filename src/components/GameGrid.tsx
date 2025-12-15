import { Box, Grid, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "@/services/api-client";

interface Game {
  id: number;
  name: string;
  background_image: string | null;
}

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get<FetchResponse<Game>>("/xgames")
      .then((res) => {
        if (cancelled) return;
        setGames(res.data.results);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
