import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import HomePage from "./pages/HomePage/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import ThemeProvider from "./utils/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/:code"
            element={
              <ScrollToTop>
                <CountryDetailsPage />
              </ScrollToTop>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
