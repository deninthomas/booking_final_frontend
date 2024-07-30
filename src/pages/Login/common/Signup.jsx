import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  Stack,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import signupImg from "../../../components/common/bakground/signup.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useToastNotfication } from "../../../components/common/toasts";
import { signUpApi } from "../../../serviceHandlers/services/publicEndpoints";

const Signup = () => {
  const { t } = useTranslation(["authpages"], { keyPrefix: "signupPage" });
  const navigate = useNavigate();
  const { successToast, failureToast } = useToastNotfication();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = (role) => {
    setSelectedRole((prevRole) => (prevRole === role ? "" : role));
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setSelectedRole("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = t("firstNameRequired");
    if (!lastName) newErrors.lastName = t("lastNameRequired");
    if (!email) newErrors.email = t("emailRequired");
    if (!phone || phone.length < 10) newErrors.phone = t("phoneRequired");
    if (!password) newErrors.password = t("passwordRequired");
    if (!selectedRole) newErrors.role = t("roleRequired");
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await signUpApi({
        firstName,
        lastName,
        email,
        phone,
        password,
        role: selectedRole,
      });

      if (!response.error) {
        onSuccessOfSignup(response);
        navigate("/login");
      } else {
        onFailureOfSignup();
      }
    } catch (error) {
      onFailureOfSignup();
    } finally {
      setLoading(false);
    }
  };

  const onSuccessOfSignup = (res) => {
    setShowSuccess(true);
    clearForm();
    successToast();
  };

  const onFailureOfSignup = () => {
    failureToast();
    setShowSuccess(false);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Flex height="150vh" justifyContent="center" alignItems="center" backgroundColor="gray.50">
      <Flex width="60%" boxShadow="lg" borderRadius="xl" overflow="hidden" backgroundColor="white">
        <Box width="50%" padding={8}>
          <VStack spacing={4} align="flex-start">
            <Text fontSize="2xl" fontWeight="bold">{t('title')}</Text>
            <Text color="gray.600">{t('subtitle')}</Text>

            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>{t('firstName')}</FormLabel>
              <Input
                boxShadow={4}
                h={7}
                paddingLeft="1rem"
                value={firstName}
                placeholder={t('firstName')}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>{t('lastName')}</FormLabel>
              <InputGroup>
                <Input
                  boxShadow={4}
                  h={7}
                  value={lastName}
                  paddingLeft="1rem"
                  placeholder={t('lastName')}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>{t('phone')}</FormLabel>
              <Input
                boxShadow={4}
                h={7}
                value={phone}
                paddingLeft="1rem"
                placeholder={t('phone')}
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
              />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>{t('email')}</FormLabel>
              <Input
                boxShadow={4}
                h={7}
                paddingLeft="1rem"
                placeholder={t('email')}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>{t('password')}</FormLabel>
              <InputGroup>
                <Input
                  boxShadow={4}
                  h={7}
                  value={password}
                  paddingLeft="1rem"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('password')}
                />
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.role}>
              <FormLabel>{t('rolePrompt')}</FormLabel>
              <Stack spacing={5} direction="row" gap={9} borderWidth={9} p={2} borderRadius={10}>
                <Checkbox
                  colorScheme="blue"
                  fontWeight={18}
                  isChecked={selectedRole === "admin"}
                  onChange={() => handleCheckboxChange("admin")}
                >
                  {t('admin')}
                </Checkbox>

                <Checkbox
                  colorScheme="green"
                  fontWeight={20}
                  isChecked={selectedRole === "user"}
                  onChange={() => handleCheckboxChange("user")}
                >
                  {t('user')}
                </Checkbox>
              </Stack>
              <FormErrorMessage>{errors.role}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              color="white"
              backgroundColor="#1ea3eb"
              borderRadius={20}
              h={10}
              width="full"
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={loading}
            >
              {t('signupButton')}
            </Button>

            <Text align="center" width="full">{t('or')}</Text>

            <Text fontSize="sm" align="center" width="full">
              {t('alreadyHaveAccount')}{" "}
              <Text as="span" color="blue.500" cursor="pointer">
                {t('signin')}
              </Text>
            </Text>
          </VStack>
        </Box>
        <Box
          width="50%"
          backgroundImage={`url(${signupImg})`}
          backgroundSize="cover"
          backgroundPosition="center"
        />
      </Flex>
    </Flex>
  );
};

export default Signup;
