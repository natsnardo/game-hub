import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import GameGrid from "@/components/GameGrid";
import GenreList from "@/components/GenreList";
import type { Genre } from "@/components/hooks/useGenres";
import { useState } from "react";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

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
        <NavBar />
      </GridItem>

      <GridItem area="aside" hideBelow="lg" padding={5}>
        <GenreList
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre(genre)}
        />
      </GridItem>

      <GridItem area="main">
        <GameGrid
          key={selectedGenre?.id ?? "all"}
          genreId={selectedGenre?.id}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
