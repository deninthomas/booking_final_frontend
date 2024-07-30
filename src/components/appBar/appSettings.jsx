import React from "react";
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AppSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Menu>
      <MenuButton as={"div"} ml={2}>
        <Box display="flex" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="30px"
            src="https://bit.ly/dan-abramov"
            alt="Profile Image"
          />
          <ChevronDownIcon />
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaUser />}  onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
