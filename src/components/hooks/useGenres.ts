import genres from "@/data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string | null;
}

const useGenres = () => {
  const { data, isLoading, error } = {
    data: genres,
    isLoading: false,
    error: null,
  };

  return { genres: data, isLoading, error };
};

export default useGenres;
