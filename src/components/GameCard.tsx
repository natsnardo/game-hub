import { Card, Heading, Image } from "@chakra-ui/react";
import type { Game } from "@/components/hooks/useGames";
import PlatformIconList from "@/components/PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const platforms = game.parent_platforms?.map((p) => p.platform);

  return (
    <Card.Root overflow="hidden">
      {game.background_image && (
        <Image
          src={game.background_image}
          alt={game.name}
          width="100%"
          height="200px"
          objectFit="cover"
        />
      )}
      <Card.Body>
        <Heading size="md">{game.name}</Heading>
        <PlatformIconList platforms={platforms} />
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;
