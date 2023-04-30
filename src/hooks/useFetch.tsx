import { useState, useEffect } from "react";

type ResponseData = {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
      };
    };
  };
  flags: {
    png: string;
  };
  cca3: string;
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  tld?: string[];
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders?: string[];
};

export type CountryData = {
  flag: string;
  population: string;
  region: string;
  capital?: string;
  name: string;
  nativeName?: string;
  subRegion: string;
  TLD?: string;
  currencies: string[];
  languages: string[];
  code: string;
  borderCountries?: string[];
};

const extractNativeName = (names: { [key: string]: { official: string } }) => {
  for (let key in names) {
    return names[key].official;
  }
};

const extractCurrencies = (currencies: { [key: string]: { name: string } }) => {
  let result: string[] = [];
  for (let key in currencies) {
    result.push(currencies[key].name);
  }
  return result;
};

const extractLanguages = (languages: { [key: string]: string }) => {
  let result: string[] = [];
  for (let key in languages) {
    result.push(languages[key]);
  }
  return result;
};

const convertPopulation = (population: number) => {
  let numberFormatter = Intl.NumberFormat("en-US");
  return numberFormatter.format(population);
};

const useFetch = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("countryData")) {
      setCountriesData(JSON.parse(localStorage.getItem("countryData") || ""));
      return;
    }
    setIsLoading(true);
    setIsError(false);
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const newState: CountryData[] = [];
        data.forEach((country: ResponseData) => {
          const {
            flags,
            population,
            region,
            capital,
            name,
            subregion,
            tld,
            currencies,
            languages,
            cca3,
            borders,
          } = country;
          newState.push({
            flag: flags.png,
            population: convertPopulation(population),
            region: region,
            capital: capital ? capital[0] : undefined,
            name: name.common,
            nativeName: extractNativeName(name.nativeName),
            subRegion: subregion,
            TLD: tld ? tld[0] : undefined,
            currencies: extractCurrencies(currencies),
            languages: extractLanguages(languages),
            code: cca3,
            borderCountries: borders,
          });
        });
        localStorage.setItem("countryData", JSON.stringify(newState));
        setCountriesData(newState);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return { isError, isLoading, countriesData };
};

export default useFetch;
