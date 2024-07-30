import { Box, Grid } from "@chakra-ui/react";
import React from "react";

export const ContentSection = ({ children }) => {
  return (
    <Grid
      templateRows="1fr"
      templateColumns="1fr"
      flex="1"
      overflow="hidden"
      backgroundImage="url('https://wallpapers.com/images/hd/dark-city-long-exposure-70xebgkc8y8kb20u.jpg')"
      h="100%"
      w="100%"
      as="main"
      p={4}
      overflowY="auto"
    >
      <Box h="100%" w="100%" >
        {children}
      </Box>
    </Grid>
  );
};
