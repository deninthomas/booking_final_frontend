import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  Stack,
  Badge,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DeleteProducts } from "../../serviceHandlers/services/productAccess";

export const EntityListItem = (props) => {
  const { _id, images, name, price, roomType, capacity, description } = props.product;
  const navigate = useNavigate();
  const toast = useToast();


  const handleBookmark = (e) => {
    e.stopPropagation();
    navigate(`/manage-products?id=${_id}`)
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    DeleteProducts({ id: _id }).then(res => {
      if (res.error) {
        toast({
          title: "Delete successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    })
  };

  if (images?.length && images.every((item) => !!item)) {
    return (
      <Box
        key={_id}
        borderRadius="lg"
        overflow="hidden"
        padding={4}
        position="relative"
        onClick={() => navigate({ pathname: `/view`, search: `?id=${_id}` })}
        _hover={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          transform: "translateY(-4px)",
          transition: "all 0.3s ease",
          bg: "neutral",
        }}
        m={2}
        bg="accent"
      >
        <Grid templateColumns="1fr 3fr 1fr" gap={4} alignItems="center">
          <Box width="150px">
            <Carousel showThumbs={false} infiniteLoop={true} dynamicHeight={true}>
              {images.map((img, index) => (
                <Box key={index}>
                  <Image boxSize="150px" objectFit="cover" src={img} />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box>
            <Heading as="h3" size="lg" color="text">{name}</Heading>
            <Stack spacing={2} mt={2}>
              <Badge colorScheme="green">{roomType}</Badge>
              <Text color="text">{`Capacity: ${capacity}`}</Text>
              <Text color="text" noOfLines={3}>{description}</Text>
              <Flex alignItems="center" mt={2}>
                <Text fontWeight="bold" fontSize="2xl" color="secondary">
                  {price}
                </Text>
                <Text fontSize="lg" color="text" ml={2}>
                  / night
                </Text>
              </Flex>
            </Stack>
          </Box>
          <Flex direction="row" justifyContent={'flex-end'} alignItems="flex-start" h={'100%'} >
            <Tooltip label={"Edit "} fontSize="md">
              <IconButton
                icon={<FaPen />}
                isRound
                size="lg"
                variant="ghost"
                colorScheme="teal"
                onClick={handleBookmark}
                mb={2}
                _hover={{ color: "secondary" }}
              />
            </Tooltip>
            <Tooltip label="Delete" fontSize="md">
              <IconButton
                icon={<FaTrashAlt />}
                isRound
                size="lg"
                variant="ghost"
                colorScheme="red"
                onClick={handleDelete}
                _hover={{ color: "secondary" }}
              />
            </Tooltip>
          </Flex>
        </Grid>
      </Box>
    );
  }
  return null;
};

export const DeleteEntity = () => {
  const { t } = useTranslation(["product"]);
  return (
    <Button position="absolute" top={2} right={2} variant="solid">
      {t("delete")}
    </Button>
  );
};
