import { Box, Button, HStack, Menu } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "", label: "Relevance" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-added", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
  { value: "-metacritic", label: "Metacritic" },
];

interface Props {
  sortOrder: string;
  onSelectSortOrder: (sortOrder: string) => void;
}

const SortSelector = ({ sortOrder, onSelectSortOrder }: Props) => {
  const current = sortOptions.find((o) => o.value === sortOrder);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" cursor="pointer">
          <HStack gap={2}>
            <Box as="span">
              Order by:{" "}
              <Box as="span" fontWeight="bold">
                {current?.label ?? "Relevance"}
              </Box>
            </Box>
            <Box as={FiChevronDown} aria-hidden />
          </HStack>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {sortOptions.map((option) => (
            <Menu.Item
              key={option.value || "relevance"}
              value={option.value}
              onClick={() =>
                onSelectSortOrder(
                  option.value === sortOrder ? "" : option.value
                )
              }
              cursor="pointer"
              fontWeight={option.value === sortOrder ? "bold" : undefined}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default SortSelector;
