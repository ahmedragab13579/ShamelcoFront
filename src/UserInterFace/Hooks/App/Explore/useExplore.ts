// src/Pages/User/Explore/useExplore.ts
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchPlacesQuery } from "../../../../BackEndIntegration/Hooks/Queries/useCustomerQueries";

export const PITCH_FILTERS = [
  { text: "الكل", value: "" },
  { text: "خماسي", value: "FiveASide" },
  { text: "سداسى", value: "SixASide" },
  { text: "بادل", value: "Padel" },
  { text: "تنس", value: "Tennis" },
];

export const VENUE_FILTERS = [
  { text: "الكل", value: "" },
  { text: "بلايستيشن", value: "Cafe" },
  { text: "مطعم", value: "Restaurant" },
  { text: "كافىه", value: "Cafe" },
];

export const useExplore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTermFromUrl = searchParams.get("searchTerm") || "";
  const placeTypeFromUrl = searchParams.get("placeType") || "Pitch";
  const categoryFromUrl = searchParams.get("category") || "";

  const [searchInput, setSearchInput] = useState(searchTermFromUrl);
  const [activePlaceType, setActivePlaceType] = useState(placeTypeFromUrl);
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  const SearchPlaces = useSearchPlacesQuery({
    searchTerm: searchTermFromUrl,
    category: categoryFromUrl,
    typeFilter: activePlaceType,
  });

  const updateUrlParams = (search: string, type: string, cat: string) => {
    const params: Record<string, string> = {};
    if (search.trim()) params.searchTerm = search;
    if (type) params.placeType = type;
    if (cat) params.category = cat;
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(searchInput, activePlaceType, activeCategory);
  };

  const handlePlaceTypeChange = (type: string) => {
    setActivePlaceType(type);
    setActiveCategory("");
    updateUrlParams(searchInput, type, "");
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    updateUrlParams(searchInput, activePlaceType, category);
  };

  const currentQuickFilters = activePlaceType === "Pitch" ? PITCH_FILTERS : VENUE_FILTERS;

  return {
    state: {
      searchInput,
      activePlaceType,
      activeCategory,
      currentQuickFilters,
      SearchPlaces,
    },
    actions: {
      setSearchInput,
      handleSearchSubmit,
      handlePlaceTypeChange,
      handleCategoryChange,
    },
  };
};