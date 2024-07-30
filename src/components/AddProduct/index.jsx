import React, { useState, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Box,
  HStack,
  Select,
  FormErrorMessage,
  useToast,
  Text,
  Image,
  SimpleGrid,
  Checkbox,
  CheckboxGroup,
  VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectFormState, setFormState } from "../../redux/productSlice";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { CreateProducts, UpdateProducts } from "../../serviceHandlers/services/productAccess";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export const ProductForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("product", { keyPrefix: "addproduct" });
  const formState = useSelector(selectFormState);
  const toast = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = t("nameRequired");
    if (!formState.description) newErrors.description = t("descriptionRequired");
    if (!formState.price) newErrors.price = t("priceRequired");
    if (!formState.place) newErrors.place = t("placeRequired");
    if (!formState.category) newErrors.category = t("categoryRequired");
    if (!formState.capacity) newErrors.capacity = t("capacityRequired");
    if (!formState.amenities || formState.amenities.length === 0) newErrors.amenities = t("amenitiesRequired");
    return newErrors;
  };

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(
      setFormState({ key: event.target.name, value: event.target.value })
    );
  };

  const handleAmenitiesChange = (values) => {
    dispatch(setFormState({ key: "amenities", value: values }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.filter((file) => file.size < 70000);

    if (acceptedFiles.length !== newFiles.length) {
      toast({
        title: t("fileTooLarge"),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    // Merge new files with existing ones
    setFiles(prev => {
      const temp = prev.concat(newFiles);
      return temp;
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const afterSuccess = () => {
    toast({
      title: isEdit ? "Updated successfully!" : "New Entity Added!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate('/control-center');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create a FormData object
    const formData = new FormData();

    // Append form fields
    formData.append("name", formState.name);
    if (isEdit)
      formData.append("id", formState._id);
    formData.append("description", formState.description);
    formData.append("price", formState.price);
    formData.append("place", formState.place);
    formData.append("category", formState.category);
    formData.append("capacity", formState.capacity);
    formData.append("amenities", formState.amenities);

    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });

    if (isEdit) {
      try {
        const response = await UpdateProducts(formData);
        if (!response.error)
          afterSuccess()
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
    else {
      try {
        const response = await CreateProducts(formData);
        if (!response.error)
          afterSuccess()
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  return (
    <Box
      p={4}
      maxWidth="600px"
      margin="auto"
      backgroundColor="accent"
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="productName" isInvalid={errors.name}>
            <FormLabel color="text">{t("name")}</FormLabel>
            <Input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              variant="outline"
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>

          <FormControl id="productDescription" isInvalid={errors.description}>
            <FormLabel color="text">{t("description")}</FormLabel>
            <Textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              variant="outline"
            />
            {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
          </FormControl>

          <HStack spacing={4}>
            <FormControl id="productPrice" isInvalid={errors.price}>
              <FormLabel color="text">{t("price")}</FormLabel>
              <Input
                type="number"
                name="price"
                value={formState.price}
                onChange={handleChange}
                variant="outline"
              />
              {errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="place" isInvalid={errors.place}>
              <FormLabel color="text">{t("place")}</FormLabel>
              <Input
                type="text"
                name="place"
                value={formState.place}
                onChange={handleChange}
                variant="outline"
              />
              {errors.place && <FormErrorMessage>{errors.place}</FormErrorMessage>}
            </FormControl>
          </HStack>

          <FormControl id="category" isInvalid={errors.category}>
            <FormLabel color="text">{t("category")}</FormLabel>
            <Select
              name="category"
              value={formState.category}
              onChange={handleChange}
              placeholder={t("selectCategory")}
              variant="outline"
            >
              <option value="deluxe">{t("deluxe")}</option>
              <option value="single">{t("single")}</option>
              <option value="dormitory">{t("dormitory")}</option>
            </Select>
            {errors.category && <FormErrorMessage>{errors.category}</FormErrorMessage>}
          </FormControl>

          <FormControl id="capacity" isInvalid={errors.capacity}>
            <FormLabel color="text">{t("capacity")}</FormLabel>
            <Input
              type="number"
              name="capacity"
              value={formState.capacity}
              onChange={handleChange}
              variant="outline"
            />
            {errors.capacity && <FormErrorMessage>{errors.capacity}</FormErrorMessage>}
          </FormControl>

          <FormControl id="amenities" isInvalid={errors.amenities}>
            <FormLabel color="text">{t("amenities")}</FormLabel>
            <CheckboxGroup
              colorScheme="teal"
              value={formState.amenities}
              onChange={handleAmenitiesChange}
            >
              <VStack alignItems="flex-start">
                <Checkbox value="wifi">{t("wifi")}</Checkbox>
                <Checkbox value="parking">{t("parking")}</Checkbox>
                <Checkbox value="pool">{t("pool")}</Checkbox>
                <Checkbox value="gym">{t("gym")}</Checkbox>
              </VStack>
            </CheckboxGroup>
            {errors.amenities && <FormErrorMessage>{errors.amenities}</FormErrorMessage>}
          </FormControl>

          <FormControl id="uploadImages">
            <FormLabel color="text">{t("uploadImages")}</FormLabel>
            <Box
              {...getRootProps()}
              borderWidth={1}
              borderRadius="md"
              p={4}
              textAlign="center"
              borderColor="gray.300"
              backgroundColor="white"
              cursor="pointer"
            >
              <input {...getInputProps()} />
              <Text>{t("dragDropImages")}</Text>
              <Text fontSize="sm" color="gray.500">{t("maxFileSize")}</Text>
              <Text fontSize="sm" color="gray.500">{t("maxFiles")}</Text>
            </Box>
            <Box mt={4}>
              {files.length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {files.map((file) => (
                    <Box key={file.name} display="flex" flexDirection="column" alignItems="center">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={2}
                      />
                      <Text color="text">{file.name}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            backgroundColor="secondary"
            color="text"
          >
            {t("save")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
