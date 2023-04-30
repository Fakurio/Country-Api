import React from "react";
import "./CountryDetailsPage.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext } from "react";
import { CountryData } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeProvider";

type BorderCountry = {
  name: string;
  code: string;
};

const CountryDetailsPage: React.FC = () => {
  const { code } = useParams();
  const { countriesData } = useFetch();
  const [currentCountry, setCurrentCountry] = useState<CountryData>();
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setCurrentCountry(
      countriesData.filter((country) => country.code === code)[0]
    );
  }, [countriesData, code]);

  useEffect(() => {
    let newBorderCountries: CountryData[] = [];
    currentCountry?.borderCountries?.forEach((code) => {
      newBorderCountries.push(
        countriesData.filter((country) => country.code === code)[0]
      );
    });
    setBorderCountries(
      newBorderCountries.map((country) => {
        return { name: country.name, code: country.code };
      })
    );
  }, [currentCountry]);

  return (
    <>
      <Header />
      <div
        className="country-container"
        data-theme={`${theme === "dark" ? "dark" : "light"}`}
      >
        <Link to="/" className="return">
          <Button text="Back" className="btn--return" />
        </Link>
        <main className="country-details">
          <img className="country-details__flag" src={currentCountry?.flag} />
          <div className="country-details-container">
            <h2 className="country-details__name">{currentCountry?.name}</h2>
            <div className="flex-container">
              <div className="country-details__first-section">
                <p>
                  Native name: <span>{currentCountry?.nativeName}</span>
                </p>
                <p>
                  Population: <span>{currentCountry?.population}</span>
                </p>
                <p>
                  Region: <span>{currentCountry?.region}</span>
                </p>
                <p>
                  Sub Region: <span>{currentCountry?.subRegion}</span>
                </p>
                <p>
                  Capital: <span>{currentCountry?.capital}</span>
                </p>
              </div>
              <div className="country-details__second-section">
                <p>
                  Top Level Domain: <span>{currentCountry?.TLD}</span>
                </p>
                <p>
                  Currencies:{" "}
                  <span>{currentCountry?.currencies.join(", ")}</span>
                </p>
                <p>
                  Languages: <span>{currentCountry?.languages.join(", ")}</span>
                </p>
              </div>
            </div>
            <div className="border-countries">
              <h2 className="border-countries__title">Border Countries:</h2>
              <div className="border-countries__links">
                {borderCountries.length === 0
                  ? "No border countries"
                  : borderCountries.map((country) => (
                      <Link to={`/${country.code}`} key={country.code}>
                        <Button text={country.name} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CountryDetailsPage;
