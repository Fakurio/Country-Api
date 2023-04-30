import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ScrollToTop from "./utils/ScrollToTop";
import CountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage";
import { ThemeContext } from "./utils/ThemeProvider";

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="app" data-theme={`${theme === "dark" ? "dark" : "light"}`}>
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
    </div>
  );
};

export default App;
