import { useEffect, useState } from "react";
import apiClient from "@/services/api-client";
import { CanceledError } from "axios";

interface PlatformDetails {
  description?: string;
  description_raw?: string;
}

const usePlatformDescription = (platformId?: number) => {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!platformId) return;

    const controller = new AbortController();
    queueMicrotask(() => setIsLoading(true));

    apiClient
      .get<PlatformDetails>(`/platforms/${platformId}`, {
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
  }, [platformId]);

  return {
    description: platformId ? description : "",
    isLoading: platformId ? isLoading : false,
    error: platformId ? error : "",
  };
};

export default usePlatformDescription;
