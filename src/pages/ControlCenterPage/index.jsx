import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ProductForm } from "../../components/AddProduct";
import BillingHistory from "../Billing";
import { FaPlus, FaHistory } from "react-icons/fa";

export const ControlCenter = () => {
  return (
    <Box p={6} maxWidth="800px" mx="auto" bg="primary" color="text" borderRadius="md" boxShadow="lg">
      <VStack spacing={6}>
        <Heading color="text">Control Center</Heading>
        <Accordion allowToggle width="100%">
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _expanded={{ bg: "secondary", color: "primary" }}
                _hover={{ bg: "neutral" }}
                borderRadius="md"
                transition="background-color 0.2s"
                p={4}
              >
                <Box flex="1" textAlign="left" fontWeight="bold" display="flex" alignItems="center">
                  <Icon as={FaPlus} mr={2} />
                  <Text>Add Product</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ProductForm />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _expanded={{ bg: "secondary", color: "primary" }}
                _hover={{ bg: "neutral" }}
                borderRadius="md"
                transition="background-color 0.2s"
                p={4}
              >
                <Box flex="1" textAlign="left" fontWeight="bold" display="flex" alignItems="center">
                  <Icon as={FaHistory} mr={2} />
                  <Text>Show History</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <BillingHistory />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};
