import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./i18n";
import theme from "./theme";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraBaseProvider theme={theme}>
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ChakraBaseProvider>
);

