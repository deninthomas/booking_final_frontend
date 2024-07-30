import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const useToastNotfication = () => {
  const toast = useToast();
  const { t } = useTranslation("common");

  const successToast = () => {
    toast({
      title: t("apiresponse.success"),
      description: "test",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const failureToast = () => {
    toast({
      title: t("apiresponse.error"),
      description: "test",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };
  return { toast, successToast, failureToast };
};
