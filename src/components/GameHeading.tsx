import { Heading, Spinner, Text } from "@chakra-ui/react";
import type { Genre } from "@/components/hooks/useGenres";
import type { Platform } from "@/components/hooks/usePlatforms";
import useGameCount from "@/components/hooks/useGameCount";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  searchText?: string;
}

const GameHeading = ({
  selectedGenre,
  selectedPlatform,
  searchText,
}: Props) => {
  const genreName = selectedGenre?.name;
  const platformName = selectedPlatform?.name;

  const { count, isLoading } = useGameCount({
    genreId: selectedGenre?.id,
    platformId: selectedPlatform?.id,
    searchText,
  });

  const baseHeading = [platformName, genreName].filter(Boolean).join(" ");
  const heading = baseHeading ? `${baseHeading} Games` : "Games";

  const countLabel =
    !isLoading && typeof count === "number"
      ? `${count.toLocaleString()} games`
      : "";

  return (
    <>
      <Heading as="h1" size="2xl" paddingX={4} paddingTop={4}>
        {heading}
        {isLoading && (
          <Spinner
            size="sm"
            marginInlineStart={3}
            color="fg.muted"
            verticalAlign="middle"
          />
        )}
        {countLabel && (
          <Text as="span" color="fg.muted" fontSize="lg" fontWeight="normal">
            {" "}
            ({countLabel})
          </Text>
        )}
      </Heading>
    </>
  );
};

export default GameHeading;
