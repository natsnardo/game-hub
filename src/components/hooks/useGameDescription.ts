import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "@/services/api-client";

interface GameDetails {
  description?: string;
  description_raw?: string;
}

const useGameDescription = (gameId: number) => {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    queueMicrotask(() => setIsLoading(true));

    apiClient
      .get<GameDetails>(`/games/${gameId}`, {
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
  }, [gameId]);

  return { description, isLoading, error };
};

export default useGameDescription;
