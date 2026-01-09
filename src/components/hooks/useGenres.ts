import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { type FetchResponse } from "@/services/api-client";
import genres from "@/data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string | null;
}

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () => {
  const { data, isLoading, error } = useQuery<FetchResponse<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: () => apiClient.getAll(),
    initialData: genres,
    staleTime: ms("24h"),
  });

  return {
    genres: data?.results || [],
    isLoading,
    error: error?.message || null,
  };
};

export default useGenres;
