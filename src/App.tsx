import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import GameGrid from "@/components/GameGrid";
import GenreList from "@/components/GenreList";
import type { Genre } from "@/components/hooks/useGenres";
import type { Platform } from "@/components/hooks/usePlatforms";
import PlatformSelector from "@/components/PlatformSelector";
import SortSelector from "@/components/SortSelector";
import GameHeading from "@/components/GameHeading";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");

  const [gameQuery, setGameQuery] = useState<{
    selectedGenre: Genre | null;
    selectedPlatform: Platform | null;
    sortOrder: string;
    searchText: string;
  }>({
    selectedGenre: null,
    selectedPlatform: null,
    sortOrder: "",
    searchText: "",
  });

  const normalizedSearchText = searchText.trim().replace(/\s+/g, " ");

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, // 1024px
      }}
      templateColumns={{ base: "1fr", lg: "280px 1fr" }}
      columnGap={{ base: 0, lg: 6 }}
    >
      <GridItem area="nav">
        <NavBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={() =>
            setGameQuery((q) => ({ ...q, searchText: normalizedSearchText }))
          }
        />
      </GridItem>

      <GridItem area="aside" hideBelow="lg" padding={5}>
        <GenreList
          selectedGenre={gameQuery.selectedGenre}
          onSelectGenre={(genre) =>
            setGameQuery((q) => ({ ...q, selectedGenre: genre }))
          }
        />
      </GridItem>

      <GridItem area="main">
        <GameHeading
          selectedGenre={gameQuery.selectedGenre}
          selectedPlatform={gameQuery.selectedPlatform}
          searchText={gameQuery.searchText}
        />
        <HStack gap={3} paddingX={4} paddingTop={4} paddingBottom={2}>
          <PlatformSelector
            selectedPlatform={gameQuery.selectedPlatform}
            onSelectPlatform={(selectedPlatform) =>
              setGameQuery((q) => ({ ...q, selectedPlatform }))
            }
          />
          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setGameQuery((q) => ({ ...q, sortOrder }))
            }
          />
        </HStack>
        <GameGrid
          key={`${gameQuery.selectedGenre?.id ?? "all"}-${
            gameQuery.selectedPlatform?.id ?? "all"
          }-${gameQuery.sortOrder}-${gameQuery.searchText}`}
          genreId={gameQuery.selectedGenre?.id}
          platformId={gameQuery.selectedPlatform?.id ?? undefined}
          sortOrder={gameQuery.sortOrder}
          searchText={gameQuery.searchText}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
