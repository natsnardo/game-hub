import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY as string | undefined;

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey,
  },
});

export default apiClient;
