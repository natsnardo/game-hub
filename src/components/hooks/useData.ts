import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

type RequestParams = Record<string, string | number | boolean | undefined>;

interface PaginationInfo {
  count: number;
  next: string | null;
  previous: string | null;
}

const useData = <T>(
  endpoint: string,
  params?: RequestParams,
  depsKey?: string | number | boolean
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const paramsKey = JSON.stringify(params ?? {});

  useEffect(() => {
    const controller = new AbortController();
    const parsedParams = JSON.parse(paramsKey) as RequestParams;

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        params: parsedParams,
      })
      .then((res) => {
        setData(res.data.results);
        setPagination({
          count: res.data.count,
          next: null,
          previous: null,
        });
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
  }, [endpoint, paramsKey, depsKey]);

  return { data, isLoading, error, pagination };
};

export default useData;
