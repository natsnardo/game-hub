import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import useGames from "@/components/hooks/useGames";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/GameCardSkeleton";
import GamePagination from "@/components/GamePagination";

interface Props {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

const GameGrid = ({ genreId, platformId, sortOrder, searchText }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Fixed page size

  const { games, isLoading, error, pagination } = useGames({
    genreId,
    platformId,
    sortOrder,
    searchText,
    page: currentPage,
    pageSize,
  });

  const totalPages = pagination ? Math.ceil(pagination.count / pageSize) : 1;
  const totalItems = pagination?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      {isLoading && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          gap={6}
          padding={4}
        >
          {Array.from({ length: pageSize }).map((_, index) => (
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
            <>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                gap={6}
                padding={4}
              >
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </SimpleGrid>

              <GamePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameGrid;
