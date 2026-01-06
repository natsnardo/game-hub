import useData from "@/components/hooks/useData";

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
  page?: number;
  pageSize?: number;
}

const useGames = ({
  genreId,
  platformId,
  sortOrder,
  searchText,
  page = 1,
  pageSize = 20,
}: GameQuery) => {
  const normalizedSearchText = searchText?.trim();

  const params = {
    genres: genreId,
    platforms: platformId,
    ordering: sortOrder || undefined,
    search: normalizedSearchText || undefined,
    page,
    page_size: pageSize,
  };

  const depsKey = `${genreId ?? "all"}-${platformId ?? "all"}-${
    sortOrder ?? ""
  }-${normalizedSearchText ?? ""}-${page}-${pageSize}`;

  const { data, isLoading, error, pagination } = useData<Game>(
    "/games",
    params,
    depsKey
  );

  return { games: data, isLoading, error, pagination };
};

export default useGames;
