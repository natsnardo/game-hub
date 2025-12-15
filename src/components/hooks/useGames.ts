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

const useGames = (genreId?: number) => {
  const { data, isLoading, error } = useData<Game>(
    "/games",
    genreId ? { genres: genreId } : undefined,
    genreId ?? "all"
  );

  return { games: data, isLoading, error };
};

export default useGames;
