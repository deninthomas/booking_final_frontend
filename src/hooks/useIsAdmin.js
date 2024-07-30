import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAdmin,
  selectIsAuthenticated,
  setIsAdmin,
  setIsAuthenticated,
} from "../redux/appConfigurationSlice";
import React, { useState } from "react";
import { getConfiguration } from "../serviceHandlers/services/configAccess";
import { useNavigate } from "react-router-dom";

export const useIsAdmin = () => {
  const isAdmin = useSelector(selectIsAdmin);
  return { isAdmin };
};

export const useGetConfiguration = () => {
  const [appLoading, setAppLoading] = React.useState(true);
  const [fetched, setFetched] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const invokeGetConfigurationService = async () => {
    setAppLoading(true);
    try {
      setFetched(true);
      const response = await getConfiguration();
      setAppLoading(false);

      if (response.data) {
        dispatch(setIsAuthenticated(true));
      }
      if (response.data.role === "admin") {
        dispatch(setIsAdmin(true));
      } else if (response.data.role === "user") {
        dispatch(setIsAdmin(false));
      }
    } catch (error) {
      console.error("Failed to fetch configuration:", error);
      setAppLoading(false);
      navigate({pathname: '/login'  })
    }
  };

  React.useEffect(() => {
    invokeGetConfigurationService();
  }, [isAuthenticated, fetched]);

  return { appLoading };
};
