import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "@/components/ui/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, // 1024px
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="aside" hideBelow="lg">
        Sidebar
      </GridItem>

      <GridItem area="main">Main</GridItem>
    </Grid>
  );
}

export default App;
