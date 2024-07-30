import React from "react";
import { Spinner, Box, chakra, keyframes } from "@chakra-ui/react";

// Define a custom animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create a Chakra UI component with custom styles
const CustomSpinner = chakra(Box, {
  baseStyle: (props) => ({
    display: "inline-block",
    width: props.size === "small" ? "30px" : "50px",
    height: props.size === "small" ? "30px" : "50px",
    border: "4px solid",
    borderColor: "gray.200",
    borderTopColor: "blue.500",
    borderRadius: "50%",
    animation: `${spin} 1s linear infinite`,
  }),
});

const AppLoader = ({ size = "small" }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CustomSpinner size={size} />
    </Box>
  );
};

export default AppLoader;
