import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Divider,
  Badge,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel"; // Import Carousel component
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentEntity,
  setCurrentEntity,
} from "../../redux/productSlice";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { CreateBooking } from "../../serviceHandlers/services/bookingAccess";
import { getProduct } from "../../serviceHandlers/services/productAccess";
import MaskedPageLoader from "../../components/PageLoader";
import { useAppLoading } from "../../hooks/useAppLoader";
import { useNavigate } from "react-router-dom";

const HotelBookingView = () => {
  const dispatch = useDispatch();
  const hotel = useSelector(selectCurrentEntity);
  const [searchParams] = useSearchParams();
  const { showLoading, hideLoading } = useAppLoading();
  const id = searchParams.get("id");
  const [showBookingSection, setShowBookingSection] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [persons, setPersons] = useState(1);
  const { t } = useTranslation("product");
  const toast = useToast();
  const navigate = useNavigate();
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  const getCurrentProduct = async () => {
    showLoading();
    const result = await getProduct({ id });
    dispatch(setCurrentEntity(result.response));
    hideLoading();
  };

  useEffect(() => {
    getCurrentProduct();
  }, []);

  const handleRoomSelection = () => {
    setShowBookingSection(true);
  };

  const handleBookingConfirm = async () => {
    // Placeholder for booking confirmation logic
    showLoading();
    const request = {
      productId: id,
      startDate,
      endDate,
      numberOfPersons: persons,
    };
    await CreateBooking(request);
    setShowBookingSection(false);
    setShowPaymentButton(true);
    hideLoading();
    toast({
      title: "Booking Successful",
      description: "Your booking has been confirmed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePayment = () => {
    navigate("/payment"); // Navigate to payment page
  };

  if (loader)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  if (hotel)
    return (
      <Box p={4} maxWidth="800px" mx="auto">
        {/* Hotel Details */}
        <Grid templateColumns={{ base: "1fr", md: "60% 1fr" }} gap={8} mb={8}>
          {/* Carousel Section */}
          <Box>
            <Carousel showThumbs={false} showArrows autoPlay infiniteLoop>
              {hotel.images.map((imageUrl, index) => (
                <Box h="300px" key={index}>
                  <img
                    src={imageUrl}
                    alt={t("hotelDetails.carouselAlt", { index: index + 1 })}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
          {/* Hotel Information Section */}
          <Box>
            <Heading as="h2" size="xl" mb={2}>
              {hotel.name}
            </Heading>
            <Text color="gray.500" fontSize="lg" mb={2}>
              {hotel.place}
            </Text>
            <HStack spacing={2} mb={2}>
              <Badge colorScheme="green">{hotel.category}</Badge>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold">
              ${hotel.price}/night
            </Text>
            <Text color="gray.500" fontSize="md" mb={2}>
              {t("hotelDetails.capacity")}: {hotel.capacity}
            </Text>
            <VStack align="start">
              <Heading as="h4" size="md" mb={1}>
                {t("hotelDetails.amenities")}:
              </Heading>
              {hotel.amenities.map((amenity, index) => (
                <Badge key={index} colorScheme="blue">
                  {amenity}
                </Badge>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* Room Selection */}
        <Box mb={4}>
          <Heading as="h3" size="lg" mb={2}>
            {t("hotelDetails.roomSelection")}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {/* Sample room card */}
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <img src="https://via.placeholder.com/150" alt="Room" />
              <Text fontWeight="bold">Room Type</Text>
              <Text fontSize="lg">${hotel.price}/night</Text>
              <Button colorScheme="teal" mt={2} onClick={handleRoomSelection}>
                {t("hotelDetails.selectRoom")}
              </Button>
            </Box>

            {/* Add more room cards here */}
          </SimpleGrid>
        </Box>

        {showBookingSection && (
          <Box mb={4} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="lg" mb={2}>
              {t("hotelDetails.enterBookingDetails")}
            </Heading>
            <FormControl mb={4}>
              <FormLabel>{t("hotelDetails.startDate")}</FormLabel>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>{t("hotelDetails.endDate")}</FormLabel>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>{t("hotelDetails.persons")}</FormLabel>
              <NumberInput
                value={persons}
                onChange={(value) => setPersons(value)}
                min={1}
                max={hotel.capacity}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button colorScheme="teal" onClick={handleBookingConfirm}>
              {t("hotelDetails.confirmBooking")}
            </Button>
          </Box>
        )}

        {showPaymentButton && (
          <Box mb={4} p={4} borderWidth="1px" borderRadius="lg">
            <Button colorScheme="blue" onClick={handlePayment}>
              Make Payment
            </Button>
          </Box>
        )}

        <Divider my={4} />

        {/* Additional Info */}
        <Box>
          <Heading as="h3" size="lg" mb={2}>
            {t("hotelDetails.additionalInfo")}
          </Heading>
          <VStack spacing={2} align="start">
            <Text>{hotel.description}</Text>
          </VStack>
        </Box>
      </Box>
    );
  return null;
};

export default HotelBookingView;
