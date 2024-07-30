import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import AuthRoutes from "../router/AuthRoutes";
import HotelBookingView from "../pages/viewEntity";
import { useGetConfiguration } from "../hooks/useIsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getProductsLIst } from "../serviceHandlers/services/productAccess";
import { setList } from "../redux/productSlice";
import MaskedPageLoader from "../components/PageLoader";
import { selectAppLoading } from "../redux/loaderSlice";
import { ControlCenter } from "../pages/ControlCenterPage";
import { ManageProduct } from "../pages/ManageProduct";
import { PaymentPortal } from "../pages/PaymentPortal";

const AppRoutes = () => {
  const { appLoading } = useGetConfiguration();
  const loadingProgress = useSelector(selectAppLoading);
  const dispatch = useDispatch();

  const getProductsService = async () => {
    const response = await getProductsLIst();
    dispatch(setList(response.data));
  };
  React.useEffect(() => {
    getProductsService();
  }, []);

  return (
    <>
      <MaskedPageLoader isLoading={appLoading | loadingProgress} />
      <Routes>
        {!appLoading && (
          <Route element={<AuthRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view" element={<HotelBookingView />} />
            <Route path="/control-center" element={<ControlCenter />} />
            <Route path="/manage-products" element={<ManageProduct />} />
            <Route path="/payment" element={<PaymentPortal/>} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
