import React, { useContext } from "react";
import "./SearchInput.scss";
import { ThemeContext } from "../../utils/ThemeProvider";

interface Props {
  handleSearchQueryChange: (text: string) => void;
  searchQuery: string;
}

const SearchInput: React.FC<Props> = ({
  handleSearchQueryChange,
  searchQuery,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="search-wrapper"
      data-theme={`${theme === "dark" ? "dark" : "light"}`}
    >
      <label htmlFor="search-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="search-wrapper__icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </label>
      <input
        id="search-input"
        className="search-wrapper__input"
        type="text"
        placeholder="Search for a country"
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
