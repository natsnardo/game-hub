import { Box, HStack, Icon } from "@chakra-ui/react";
import {
  FaAndroid,
  FaApple,
  FaChrome,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import type { Platform } from "@/components/hooks/useGames";

interface Props {
  platforms?: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const platformIconMap: Record<string, React.ElementType> = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    web: FaChrome,
  };

  return (
    <HStack gap={2} wrap="wrap">
      {platforms?.map((platform) => {
        const IconComponent = platformIconMap[platform.slug];
        if (!IconComponent) return null;

        return (
          <Box key={platform.id} color="fg.muted">
            <Icon as={IconComponent} />
          </Box>
        );
      })}
    </HStack>
  );
};

export default PlatformIconList;
