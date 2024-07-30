import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { EntityListItem } from "./EntityItem";
import { EmptyData } from "../common/emptyData";

export const EntityList = (props) => {
  const { list } = props;
  if (list.length)
    return (
      <Box   overflow={"hidden"}>
        <Grid templateColumns="1fr" gap={4} p={4}>
          {list.map((product) => (
            <EntityListItem key={product._id} product={product} />
          ))}
        </Grid>
      </Box>
    );
  return <EmptyData />;
};
