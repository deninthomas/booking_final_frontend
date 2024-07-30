// EmptyData.js
import React from 'react';
import emptyDataSvg from '../image.png';
import { Box, Heading, Image } from '@chakra-ui/react';

export const EmptyData = () => {
  return (
    <Box textAlign="center" p={8}>
      <Heading as="h2" size="lg" mb={4} color="gray.600">
        No Data Available
      </Heading>
      <Image src={emptyDataSvg} alt="Empty Data Icon" boxSize="70%" mx="auto" />
    </Box>
  );
};

