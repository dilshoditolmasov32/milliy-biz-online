// useSearch.js
import { useState, useEffect } from "react";
import { fetchSearchSuggestions } from "../service/search.service";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      const results = await fetchSearchSuggestions(query);

      setSuggestions(results);
      setIsOpen(results.length > 0);
    };

    const timer = setTimeout(load, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
  };
};
