import api from "../api/axios";

export const getProducts = ({
  page = 1,
  limit = 12,
  sort = "id",
  order = "desc",
  category_id,
  sku,
  locale,
} = {}) => {
  return api.get("/products", {
    params: {
      page,
      limit,
      sort,
      order,
      category_id,
      sku,
      locale,
    },
  });
};

export const getProductId = (id) => {
  return api.get(`/products/${id}`);
};
