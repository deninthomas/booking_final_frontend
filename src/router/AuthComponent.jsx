import React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AddEntity } from "../components/AddProduct";
import AuthRoutes from "../router/AuthRoutes";
import HotelBookingView from "../pages/viewEntity";
import { useGetConfiguration } from "../hooks/useIsAdmin";
import BillingHistory from "../pages/Billing";

export const AuthComponent = () => {
  const { appLoading } = useGetConfiguration();
  if (appLoading) {
    return <></>; // You can replace this with a loading spinner or any loading indicator
  }
  return (
    <Route element={<AuthRoutes />}>
      <Route path="/billing-history" element={<BillingHistory />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/view" element={<HotelBookingView />} />
      <Route path="/add-product" element={<AddEntity />} />
    </Route>
  );
};
