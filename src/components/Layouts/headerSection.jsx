import { Flex } from "@chakra-ui/react";
import React from "react";
import { AppBar } from "../appBar";
import { AppTaskBar } from "../appBar/appTaskBar";

export const HeaderSection = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      direction="column"
      p={4}
    >
      <AppBar />
      <AppTaskBar />
    </Flex>
  );
};
