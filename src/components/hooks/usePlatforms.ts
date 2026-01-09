import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { type FetchResponse } from "@/services/api-client";
import platforms from "@/data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => {
  const { data, isLoading, error } = useQuery<FetchResponse<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: () => apiClient.getAll(),
    initialData: platforms,
    staleTime: ms("24h"),
  });

  return {
    platforms: data?.results || [],
    isLoading,
    error: error?.message || null,
  };
};

export default usePlatforms;
