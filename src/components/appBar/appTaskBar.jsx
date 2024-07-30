import { Box, Icon, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaHeart, FaPlus } from "react-icons/fa";

export const AppTaskBar = () => {
  const { t } = useTranslation("common", { keyPrefix: "taskbar.menu" });
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  const defaultOption = {
    id: 1,
    name: t("dashboard"),
    icon: FaChartBar,
    route: "/dashboard",
  };
  const adminOptions = [
    {
      id: 2,
      name: t("control"),
      icon: FaPlus,
      route: "/control-center",
    },
  ];

  const userOptions = [
    {
      id: 2,
      name: t("wishlist"),
      icon: FaHeart,
      route: "/wishList",
    },
  ];

  const navigateToOption = (path) => {
    navigate(path);
  };

  const renderMenu = (options) => {
    return options.map((item) => (
      <Tab mr={2} id={item.id} onClick={() => navigateToOption(item.route)}>
        <Icon as={item.icon} mr={2} /> {/* Add your icon here */}
        {item.name}
      </Tab>
    ));
  };
  return (
    <Box
      display="flex"
      borderRadius={"md"}
      justifyContent={"flex-start"}
      m={2}
      w={"100%"}
      p={2}
      alignItems="center"
    >
      <Tabs variant="soft-rounded" colorScheme="secondary">
        <TabList>
          {renderMenu([
            defaultOption,
            ...(isAdmin ? adminOptions : userOptions),
          ])}
        </TabList>
      </Tabs>
    </Box>
  );
};
