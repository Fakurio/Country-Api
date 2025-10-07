import React, { useContext } from "react";
import "./CountryCard.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeProvider";

interface Props {
  flag: string;
  countryName: string;
  population: string;
  capital?: string;
  region: string;
  code: string;
  currentQuery: string;
  currentRegion: string;
}

const CountryCard: React.FC<Props> = ({
  flag,
  countryName,
  population,
  capital,
  region,
  code,
  currentQuery,
  currentRegion,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="country-card"
      data-theme={`${theme === "dark" ? "dark" : "light"}`}
    >
      <img className="country-card__flag" src={flag} />
      {/* <div className="country-card__flag">{flag}</div> */}
      <div className="country-card__details">
        <Link
          to={`/${code}`}
          onClick={() => {
            sessionStorage.setItem(
              "scrollPosition",
              JSON.stringify(window.pageYOffset)
            );
            sessionStorage.setItem("currentQuery", currentQuery);
            sessionStorage.setItem("currentRegion", currentRegion);
          }}
        >
          <h2 className="details__name">{countryName}</h2>
        </Link>
        <div className="details__info">
          <p>
            Population: <span>{population}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
