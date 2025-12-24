import {
  Box,
  Card,
  Heading,
  HStack,
  Image,
  Popover,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import type { Game } from "@/components/hooks/useGames";
import MetacriticScore from "@/components/MetacriticScore";
import PlatformIconList from "@/components/PlatformIconList";
import useGameDescription from "@/components/hooks/useGameDescription";
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

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const { description, isLoading: isLoadingDescription } = useGameDescription(
    game.id
  );

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setCardHeight(rect.height);
      setCardWidth(rect.width);
    };
    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openPopover = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    setIsPopoverOpen(true);
  };

  const scheduleClosePopover = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false);
    }, 120);
  };

  const shouldShowPopover =
    !isLoadingDescription && Boolean(description) && description.length > 180;

  return (
    <Popover.Root
      open={shouldShowPopover ? isPopoverOpen : false}
      onOpenChange={(details) => setIsPopoverOpen(details.open)}
      positioning={{
        placement: "right-start",
        gutter: 12,
        flip: true,
      }}
    >
      <Popover.Anchor asChild>
        <Card.Root
          overflow="hidden"
          ref={cardRef}
          bg="gray.800"
          color="gray.100"
        >
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
            {!isLoadingDescription && description && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                {shouldShowPopover ? (
                  <Popover.Trigger asChild>
                    <Text
                      marginTop={1}
                      color="gray.400"
                      fontSize="sm"
                      cursor="pointer"
                      onMouseEnter={openPopover}
                      onMouseLeave={scheduleClosePopover}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {description}
                    </Text>
                  </Popover.Trigger>
                ) : (
                  <Text
                    marginTop={1}
                    color="gray.400"
                    fontSize="sm"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {description}
                  </Text>
                )}
              </Box>
            )}
          </Card.Body>
        </Card.Root>
      </Popover.Anchor>

      {shouldShowPopover && (
        <Popover.Positioner>
          <Popover.Content
            width={cardWidth ? `${cardWidth}px` : undefined}
            height={cardHeight ? `${cardHeight}px` : undefined}
            bg="gray.200"
            color="gray.800"
            borderWidth="1px"
            borderColor="gray.500"
            boxShadow="lg"
            onMouseEnter={openPopover}
            onMouseLeave={scheduleClosePopover}
            _dark={{
              bg: "gray.600",
              color: "gray.100",
              borderColor: "gray.600",
            }}
          >
            <Popover.Arrow>
              <Popover.ArrowTip
                bg="white"
                borderWidth="2px"
                borderColor="gray.300"
                _dark={{
                  bg: "gray.800",
                  borderColor: "gray.600",
                }}
              />
            </Popover.Arrow>
            <Popover.Body overflowY="auto" padding={4}>
              <Text whiteSpace="pre-wrap" color="inherit">
                {description}
              </Text>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      )}
    </Popover.Root>
  );
};

export default GameCard;
