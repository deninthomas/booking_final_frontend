import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getBillingHistory } from "../../serviceHandlers/services/billingAccess"; // Adjust import based on your service

export const PaymentPortal = ({ bookingId }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Valid card number is required";
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = "Valid expiry date is required (MM/YY)";
    if (!cvc || !/^\d{3,4}$/.test(cvc)) newErrors.cvc = "Valid CVC is required";
    if (!amount || isNaN(amount) || Number(amount) <= 0) newErrors.amount = "Valid amount is required";
    return newErrors;
  };

  const handlePayment = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate an API call for payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save billing details to the database
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      await getBillingHistory({
        bookingId,
        amount,
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Payment Successful",
        description: "Your payment was completed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Payment Error:", error);
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Stack spacing={4}>
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Payment Portal
          </Heading>

          <FormControl id="name" isInvalid={errors.name}>
            <FormLabel>Name on Card</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
          </FormControl>

          <FormControl id="cardNumber" isInvalid={errors.cardNumber}>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {errors.cardNumber && <Text color="red.500">{errors.cardNumber}</Text>}
          </FormControl>

          <Flex>
            <FormControl id="expiryDate" mr={2} isInvalid={errors.expiryDate}>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              {errors.expiryDate && <Text color="red.500">{errors.expiryDate}</Text>}
            </FormControl>
            <FormControl id="cvc" isInvalid={errors.cvc}>
              <FormLabel>CVC</FormLabel>
              <Input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
              {errors.cvc && <Text color="red.500">{errors.cvc}</Text>}
            </FormControl>
          </Flex>

          <Divider />

          <FormControl id="amount" isInvalid={errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              placeholder="8000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <Text color="red.500">{errors.amount}</Text>}
          </FormControl>

          <Button
            colorScheme="blue"
            mt={4}
            isLoading={isSubmitting}
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
