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
}

const useGames = ({
  genreId,
  platformId,
  sortOrder,
  searchText,
}: GameQuery) => {
  const normalizedSearchText = searchText?.trim();

  const params = {
    genres: genreId,
    platforms: platformId,
    ordering: sortOrder || undefined,
    search: normalizedSearchText || undefined,
  };

  const depsKey = `${genreId ?? "all"}-${platformId ?? "all"}-${
    sortOrder ?? ""
  }-${normalizedSearchText ?? ""}`;

  const { data, isLoading, error } = useData<Game>("/games", params, depsKey);

  return { games: data, isLoading, error };
};

export default useGames;
