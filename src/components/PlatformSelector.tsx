import { Box, Button, HStack, Menu } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import usePlatforms from "@/components/hooks/usePlatforms";
import type { Platform } from "@/components/hooks/usePlatforms";

interface Props {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform | null) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
  const { platforms, isLoading, error } = usePlatforms();

  if (error) return null;

  const label = selectedPlatform ? selectedPlatform.name : "Platforms";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          loading={isLoading}
          cursor="pointer"
        >
          <HStack gap={2}>
            <Box as="span">{label}</Box>
            <Box as={FiChevronDown} aria-hidden />
          </HStack>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            value="all"
            onClick={() => onSelectPlatform(null)}
            bg={!selectedPlatform ? "white" : undefined}
            color={!selectedPlatform ? "gray.900" : undefined}
            fontWeight={!selectedPlatform ? "bold" : undefined}
            cursor="pointer"
            _hover={{ bg: !selectedPlatform ? "white" : "whiteAlpha.200" }}
          >
            All Platforms
          </Menu.Item>
          {platforms.map((platform) => (
            <Menu.Item
              key={platform.id}
              value={platform.slug}
              onClick={() => onSelectPlatform(platform)}
              bg={platform.id === selectedPlatform?.id ? "white" : undefined}
              color={
                platform.id === selectedPlatform?.id ? "gray.900" : undefined
              }
              fontWeight={
                platform.id === selectedPlatform?.id ? "bold" : undefined
              }
              cursor="pointer"
              _hover={{
                bg:
                  platform.id === selectedPlatform?.id
                    ? "white"
                    : "whiteAlpha.200",
              }}
            >
              {platform.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default PlatformSelector;
