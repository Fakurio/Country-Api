import React, { useEffect } from "react";
import "./HomePage.scss";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import FilterInput from "../../components/FilterInput/FilterInput";
import CountryCard from "../../components/CountryCard/CountryCard";
import { CountryData } from "../../hooks/useFetch";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const HomePage: React.FC = () => {
  const { isLoading, isError, countriesData } = useFetch();
  const [currentRegion, setCurrentRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleRegionChange = (newRegion: string) => {
    setCurrentRegion(newRegion === "America" ? "Americas" : newRegion);
  };

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  const filterCountries = () => {
    return countriesData.filter((country) => {
      if (currentRegion === "") {
        return (
          country.name.toLowerCase().indexOf(searchQuery.toLowerCase().trim()) >
          -1
        );
      } else if (country.region === currentRegion) {
        return (
          country.name.toLowerCase().indexOf(searchQuery.toLowerCase().trim()) >
          -1
        );
      }
    });
  };

  useEffect(() => {
    let scroll = sessionStorage.getItem("scrollPosition");
    if (scroll) {
      setScrollPosition(parseInt(scroll));
      sessionStorage.removeItem("scrollPosition");
    }
    let query = sessionStorage.getItem("currentQuery");
    if (query) {
      setSearchQuery(query);
      sessionStorage.removeItem("currentQuery");
    }
    let region = sessionStorage.getItem("currentRegion");
    if (region) {
      setCurrentRegion(region);
      sessionStorage.removeItem("currentRegion");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="user-filter">
          <SearchInput
            handleSearchQueryChange={handleSearchQueryChange}
            searchQuery={searchQuery}
          />
          <FilterInput
            handleRegionChange={handleRegionChange}
            currentRegion={currentRegion}
          />
        </div>
        <main className="country-cards">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="error-text">Something went wrong</p>}
          {!isError &&
            filterCountries().map((data: CountryData) => (
              <CountryCard
                flag={data.flag}
                countryName={data.name}
                population={data.population}
                region={data.region}
                capital={data.capital}
                key={data.name}
                code={data.code}
                currentQuery={searchQuery}
                currentRegion={currentRegion}
              />
            ))}
        </main>
      </div>
    </>
  );
};

export default HomePage;
