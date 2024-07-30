import React, { Suspense } from "react";
import AppRoutes from "./router";
import Layout from "./components/Layouts";
import { Provider } from "react-redux";
import store from "./store";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import PublicAccess from "./router/publicAccess";
import { useLocation } from "react-router-dom";

export const App = () => {

  const location = useLocation();
  const isLoginPage = ['login', 'signup', 'unauthorized'].some(segment =>
    location.pathname.includes(segment.toLowerCase())
  );

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <PublicAccess />
        {!isLoginPage && <Layout>
          <AppRoutes />
        </Layout>}
      </Suspense>
    </Provider>
  );
};
