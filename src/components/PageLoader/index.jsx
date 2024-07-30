import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const MaskedPageLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="9999"
    >
      <Spinner size="xl" color="white" />
    </Box>
  );
};

export default MaskedPageLoader;
