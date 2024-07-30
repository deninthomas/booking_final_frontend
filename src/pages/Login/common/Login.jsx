import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FaApple, FaGoogle } from "react-icons/fa";
import mybackground from "../../../components/common/bakground/signin.jpg";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../../components/common/AppLoader";
import { useToastNotfication } from "../../../components/common/toasts";
import { loginApi } from "../../../serviceHandlers/services/publicEndpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setIsAuthenticated,
} from "../../../redux/appConfigurationSlice";

const LoginPage = () => {
  const { t } = useTranslation(["common", "login"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { successToast, failureToast } = useToastNotfication();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const onSuccessOfLogin = (res) => {
    setShowSuccess(true);
    clearForm();
    successToast();
    navigate("/dashboard");
    dispatch(setIsAuthenticated(true));
    localStorage.setItem("token", res.result.token);
  };

  const onFailureOfLogin = () => {
    clearForm();
    failureToast();
    setShowSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted
    const response = await loginApi({ email, password });
    setLoading(false); // Reset loading state
    if (!response.error) onSuccessOfLogin(response);
    else onFailureOfLogin();
  };

  //

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // Hide success message after 3 seconds
    }
  }, [showSuccess]);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      backgroundImage={`url(${mybackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      p={20} // Add padding to avoid box sticking to the edges
    >
      <Box
        bg="#c6cecf"
        p={6}
        rounded="md"
        shadow="md"
        maxWidth="sm"
        width="full"
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {t("login:title_login")}
          </Text>

          <Input
            boxShadow={4}
            borderRadius={20}
            h={7}
            paddingLeft="1rem"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            boxShadow={4}
            borderRadius={20}
            h={7}
            paddingLeft="1rem"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text width="full" textAlign="right" color="blue.500" fontSize="sm">
            {t("login:forgot_password")}
          </Text>
          {!loading && (
            <Button
              colorScheme="white"
              borderRadius={20}
              h={10}
              color="white"
              backgroundColor="black"
              width="full"
              onClick={handleSubmit}
              _hover={{ bg: "blue.400", color: "white" }}
              disabled={loading} // Disable the button while loading
            >
              {t("login:button_login")}
            </Button>
          )}
          {loading && <AppLoader />}
          {/* Show spinner if loading, otherwise button text */}
          {showSuccess && (
            <Box
              p={4}
              maxW="md"
              mx="auto"
              boxShadow="xl"
              bg="green.200"
              borderRadius="md"
            >
              <p> {t("login:login_success")}</p>
            </Box>
          )}

          <Text>
            {t("login:not_a_member")}{" "}
            <Text as="a" color="blue.500" href="#" onClick={() => navigate('/signup')}>
              {t("login:signup")}
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
