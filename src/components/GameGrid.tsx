import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const { games, isLoading, error, fetchNextPage, hasNextPage } = useGames({
    genreId,
    platformId,
    sortOrder,
    searchText,
  });

  if (error) return <Text color="red.500">{error}</Text>;

  if (isLoading) {
    return (
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        gap={6}
        padding={4}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (games.length === 0) {
    return (
      <Center minHeight="50vh" padding={4}>
        <Text color="fg.muted">No results found.</Text>
      </Center>
    );
  }

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <Center padding={4}>
          <Spinner size="lg" />
        </Center>
      }
      endMessage={
        <Center padding={4}>
          <Text color="fg.muted">No more games to load</Text>
        </Center>
      }
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap={6}
        padding={4}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
