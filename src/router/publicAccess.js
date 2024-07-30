import React from "react";
import { Routes, Route } from "react-router-dom";
import UnauthorizedPage from "../pages/Fallbacks/UnAuthorized";
import LoginPage from "../pages/Login/common/Login";
import Signup from "../pages/Login/common/Signup";
import NotFound from "../pages/NotFound";

const PublicAccess = () => {
  return (
    <Routes>
      <Route path="/unauthorized" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default PublicAccess;