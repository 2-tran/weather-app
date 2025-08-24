import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useSearchBar(onSearch: (city: string) => void) {
  const searchParams = useSearchParams();
  const [city, setCity] = useState("");
  const [inputError, setInputError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const getCityError = (value: string): string => {
    if (!value.trim()) return "Please enter a city name";
    if (value.trim().length < 2)
      return "City name must be at least 2 characters";
    return "";
  };

  const handleSearch = () => {
    const error = getCityError(city);
    if (error) {
      setInputError(error);
      return;
    }
    setInputError("");
    onSearch(city.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (inputError) {
      setInputError(getCityError(value));
    }
  };

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    if (cityFromUrl) setCity(cityFromUrl);
  }, [searchParams]);

  return {
    city,
    inputError,
    inputRef,
    setCity,
    handleSearch,
    handleKeyPress,
    handleInputChange,
  };
}
