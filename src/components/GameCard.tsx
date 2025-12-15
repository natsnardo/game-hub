import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import type { Game } from "@/components/hooks/useGames";
import MetacriticScore from "@/components/MetacriticScore";
import PlatformIconList from "@/components/PlatformIconList";
import getCroppedImageUrl from "@/services/image-url";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const platforms = game.parent_platforms?.map((p) => p.platform);
  const croppedImageUrl = game.background_image
    ? getCroppedImageUrl(game.background_image, 600, 400)
    : null;

  return (
    <Card.Root overflow="hidden">
      {croppedImageUrl && (
        <Image
          src={croppedImageUrl}
          alt={game.name}
          width="100%"
          height="200px"
          objectFit="cover"
        />
      )}
      <Card.Body>
        <Heading size="md">{game.name}</Heading>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <PlatformIconList platforms={platforms} />
          <MetacriticScore score={game.metacritic} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;
