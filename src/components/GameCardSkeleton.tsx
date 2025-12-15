import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card.Root overflow="hidden">
      <Skeleton height="200px" width="100%" />
      <Card.Body>
        <SkeletonText noOfLines={2} gap={2} />
      </Card.Body>
    </Card.Root>
  );
};

export default GameCardSkeleton;
