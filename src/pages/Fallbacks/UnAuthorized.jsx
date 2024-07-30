import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
const UnauthorizedPage = () => {
  const { t } = useTranslation("fallbacks");
  return (
    <Box
      textAlign="center"
      mt={20}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={8}
      backgroundImage="url('../../../public/assets/subtle-prism.svg')" // Adjust the path to your SVG file
      maxW="md"
      mx="auto"
    >
      <Heading as="h1" size="xl" mb={6} color="red.500">
        {t("title")}
      </Heading>
      <Text fontSize="lg" mb={6}>
        {t("description")}
      </Text>
      <Button
        colorScheme="teal"
        onClick={() => (window.location.href = "/")}
        variant="outline"
      >
        {t("redirect")}
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
