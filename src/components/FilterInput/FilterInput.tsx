import React from "react";
import "./FilterInput.scss";
import { useState } from "react";

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

  return (
    <div className="filter-container">
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
