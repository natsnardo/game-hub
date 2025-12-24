import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/services/api-client";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  searchText?: string;
}

interface FetchResponse {
  count: number;
}

const useGameCount = ({ genreId, platformId, searchText }: GameQuery) => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizedSearchText = searchText?.trim();

  const depsKey = `${genreId ?? "all"}-${platformId ?? "all"}-${
    normalizedSearchText ?? ""
  }`;

  useEffect(() => {
    const controller = new AbortController();
    queueMicrotask(() => setIsLoading(true));

    const params = {
      genres: genreId,
      platforms: platformId,
      search: normalizedSearchText || undefined,
      page_size: 1,
    };

    apiClient
      .get<FetchResponse>("/games", {
        signal: controller.signal,
        params,
      })
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message ?? "Request failed");
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [depsKey, genreId, platformId, normalizedSearchText]);

  return { count, isLoading, error };
};

export default useGameCount;
