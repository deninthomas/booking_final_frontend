import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import AppSearch from "./appSearch";
import { AppSettings } from "./appSettings";
import { AppTitle } from "./appTitle";

export const AppBar = () => {
  return (
    <Grid
      w="100%"
      templateColumns="repeat(3, 1fr)"
      gap={2}
      alignItems={"center"}
    >
      <GridItem>
        <AppTitle />
      </GridItem>

      <GridItem>
        <AppSearch />
      </GridItem>

      <GridItem justifySelf={"flex-end"}>
        <AppSettings />
      </GridItem>
    </Grid>
  );
};
