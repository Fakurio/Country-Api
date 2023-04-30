import React from "react";
import "./FilterInput.scss";
import { useState, useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";

const initialState = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

interface Props {
  handleRegionChange: (newRegion: string) => void;
  currentRegion: string;
}

const FilterInput: React.FC<Props> = ({
  handleRegionChange,
  currentRegion,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [filterOptions, setFilterOptions] = useState(initialState);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="filter-container"
      data-theme={`${theme === "dark" ? "dark" : "light"}`}
    >
      <div className="filter-input" onClick={() => setIsHidden(!isHidden)}>
        {currentRegion || "Filter by Region"}
      </div>
      <div className="filter-options">
        {!isHidden && (
          <ul>
            {filterOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setIsHidden(!isHidden);
                  handleRegionChange(option);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterInput;
