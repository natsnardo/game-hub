import { Heading } from "@chakra-ui/react";
import type { Genre } from "@/components/hooks/useGenres";
import type { Platform } from "@/components/hooks/usePlatforms";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  searchText?: string;
}

const GameHeading = ({
  selectedGenre,
  selectedPlatform,
}: Props) => {
  const genreName = selectedGenre?.name;
  const platformName = selectedPlatform?.name;

  const baseHeading = [platformName, genreName].filter(Boolean).join(" ");
  const heading = baseHeading ? `${baseHeading} Games` : "Games";

  return (
    <Heading as="h1" size="2xl" paddingX={4} paddingTop={4}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
