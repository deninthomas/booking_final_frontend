import React from "react";
import {
  Box,
  VStack,
  Text,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChartBar, FaHeart, FaPlus } from "react-icons/fa";
import { useIsAdmin } from "../../../hooks/useIsAdmin";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { t } = useTranslation("product");
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const highlightColor = useColorModeValue("gray.400");

  const defaultOption = {
    id: 1,
    name: "Dashboard",
    icon: FaChartBar,
    route: "/product-list/dashboard",
  };
  const adminOptions = [
    {
      id: 2,
      name: "Add Product",
      icon: FaPlus,
      route: "/product-list/add-product",
    },
  ];

  const userOptions = [
    {
      id: 2,
      name: "wish list",
      icon: FaHeart,
      route: "/product-list/wishList",
    },
  ];

  const onClickOption = (path) => {
    navigate(path);
  };

  const highlightSelection = (path) => {
    if (location.pathname.includes(path)) return highlightColor;
    return "inherit";
  };

  const generateOptions = (options) => {
    return options.map((item) => (
      <Link
        display="flex"
        alignItems="center"
        p={2}
        key={item.id}
        borderRadius="md"
        onClick={() => onClickOption(item.route)}
        _hover={{ bg: "gray.300", color: "gray.700" }}
        background={highlightSelection(item.route)} // Apply active color if highlighted
      >
        <Icon as={item.icon} boxSize={5} mr={2} />
        {item.name}
      </Link>
    ));
  };

  return (
    <Box p={4} height="100%" backgroundColor="gray.200" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            {t("sidebar.title", { name: isAdmin ? "Admin" : "User" })}
          </Text>
        </Box>
        {generateOptions([
          defaultOption,
          ...(isAdmin ? adminOptions : userOptions),
        ])}
      </VStack>
    </Box>
  );
};
