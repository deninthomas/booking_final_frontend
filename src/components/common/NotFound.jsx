import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box
      p={8}
      mx="auto"
      mt={20}
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      bg="white"
      textAlign="center"
    >
      <Heading size="xl" mb={4}>
        Oops! 404 Page Not Found
      </Heading>
      <Box fontSize="lg">
        <p>It seems you've stumbled upon a page that doesn't exist.</p>
        {/* You can add more content or instructions here */}
      </Box>
    </Box>
  );
};

export default NotFound;
