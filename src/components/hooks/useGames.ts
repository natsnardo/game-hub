import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { type FetchResponse } from "@/services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string | null;
  metacritic: number | null;
  parent_platforms?: { platform: Platform }[];
}

export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

const apiClient = new APIClient<Game>("/games");

const useGames = ({ genreId, platformId, sortOrder, searchText }: GameQuery) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", { genreId, platformId, sortOrder, searchText: searchText?.trim() }],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: genreId,
          parent_platforms: platformId,
          ordering: sortOrder,
          search: searchText?.trim(),
          page: pageParam,
          page_size: 20,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: ms("1m"),
  });

  return {
    games: data?.pages.flatMap((page) => page.results) || [],
    isLoading,
    error: error?.message || null,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useGames;
