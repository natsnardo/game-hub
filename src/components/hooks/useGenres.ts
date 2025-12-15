import useData from "@/components/hooks/useData";

export interface Genre {
  id: number;
  name: string;
  image_background: string | null;
}

const useGenres = () => {
  const { data, isLoading, error } = useData<Genre>("/genres");

  return { genres: data, isLoading, error };
};

export default useGenres;
