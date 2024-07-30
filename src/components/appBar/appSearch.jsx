import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const AppSearch = () => {
  return (
    <Box display="flex" alignItems="center">
      <InputGroup mr={2}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          variant="filled"
          bg={"colors.primary"}
          type="search"
          placeholder="Search"
        />
      </InputGroup>
    </Box>
  );
};

export default AppSearch;
