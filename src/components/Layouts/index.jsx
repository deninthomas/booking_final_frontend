import React from "react";
import { Flex } from "@chakra-ui/react";
import { HeaderSection } from "./headerSection";
import { ContentSection } from "./contentSection";

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      h="100vh" // Set height to 100% of viewport height
    >
      <HeaderSection />
      <ContentSection children={children} />
    </Flex>
  );
};

export default Layout;
