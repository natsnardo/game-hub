import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import type { Game } from "@/components/hooks/useGames";
import MetacriticScore from "@/components/MetacriticScore";
import PlatformIconList from "@/components/PlatformIconList";
import getCroppedImageUrl from "@/services/image-url";
import noImagePlaceholder from "@/assets/no-image-placeholder.webp";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const platforms = game.parent_platforms?.map((p) => p.platform);
  const croppedImageUrl = game.background_image
    ? getCroppedImageUrl(game.background_image, 600, 400)
    : null;

  return (
    <Card.Root overflow="hidden" bg="gray.800" color="gray.100">
      {croppedImageUrl ? (
        <Image
          src={croppedImageUrl}
          alt={game.name}
          width="100%"
          height="200px"
          objectFit="cover"
        />
      ) : (
        <Image
          src={noImagePlaceholder}
          alt="No image available"
          width="100%"
          height="200px"
          objectFit="cover"
        />
      )}
      <Card.Body bg="white" _dark={{ bg: "inherit" }}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <PlatformIconList platforms={platforms} />
          <MetacriticScore score={game.metacritic} />
        </HStack>
        <Heading
          size="xl"
          marginTop={2}
          color="gray.800"
          _dark={{ color: "inherit" }}
        >
          {game.name}
        </Heading>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;
