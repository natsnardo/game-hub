import { useEffect, useState } from "react";
import apiClient from "@/services/api-client";
import { CanceledError } from "axios";

interface GenreDetails {
  description?: string;
  description_raw?: string;
}

const useGenreDescription = (genreId?: number) => {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!genreId) return;

    const controller = new AbortController();
    queueMicrotask(() => setIsLoading(true));

    apiClient
      .get<GenreDetails>(`/genres/${genreId}`, {
        signal: controller.signal,
      })
      .then((res) => {
        const raw = (res.data.description_raw ?? "").trim();
        const html = (res.data.description ?? "").trim();
        setDescription(raw || html);
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
  }, [genreId]);

  return {
    description: genreId ? description : "",
    isLoading: genreId ? isLoading : false,
    error: genreId ? error : "",
  };
};

export default useGenreDescription;
