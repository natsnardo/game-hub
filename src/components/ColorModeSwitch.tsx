import { Box, HStack, Switch } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Dark Mode" : "Light Mode";

  return (
    <HStack gap={2}>
      <Switch.Root
        size="md"
        variant="solid"
        colorPalette={isDark ? "purple" : "gray"}
        checked={isDark}
        onCheckedChange={(e) => setTheme(e.checked ? "dark" : "light")}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb>
            <Switch.ThumbIndicator fallback={<Box as={FiSun} boxSize={4} />}>
              <Box as={FiMoon} boxSize={4} color="gray.900" />
            </Switch.ThumbIndicator>
          </Switch.Thumb>
        </Switch.Control>
        <Switch.Label display={{ base: "none", md: "block" }}>
          {label}
        </Switch.Label>
      </Switch.Root>
    </HStack>
  );
};

export default ColorModeSwitch;
