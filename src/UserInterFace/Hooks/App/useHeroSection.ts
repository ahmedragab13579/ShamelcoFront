import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { useLanguage } from "../../Hooks/Shared/useLanguage";

export function useHeroSection() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/explore`);
    }
  };

  return {
    user,
    searchQuery,
    setSearchQuery,
    handleSearch,
    t,
  };
}
