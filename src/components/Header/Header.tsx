import React, { useContext } from "react";
import "./Header.scss";
import { ThemeContext } from "../../utils/ThemeProvider";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className="header"
      data-theme={`${theme === "dark" ? "dark" : "light"}`}
    >
      <h1 className="header__title">Where in the world?</h1>
      <button className="header__theme-switch" onClick={toggleTheme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="theme-switch__icon"
          data-theme={`${theme === "dark" ? "dark" : "light"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
        Dark Mode
      </button>
    </header>
  );
};

export default Header;
