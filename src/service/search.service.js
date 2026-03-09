import api from "../api/axios";

export const fetchSearchSuggestions = async (query, limit = 8) => {
  if (!query || query.trim().length < 2) return [];

  const res = await api.get("/products", {
    params: {
      search: query,
      limit,
    },
  });

  return  res.data?.data || [];
};
