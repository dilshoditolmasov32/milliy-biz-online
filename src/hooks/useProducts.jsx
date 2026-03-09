import { useEffect, useMemo, useState, useCallback } from "react";
import { getProducts } from "../service/product.service";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { withLang } from "../utils/withLang";

const useProducts = (params = {}) => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasNext, setHasNext] = useState(false);
  const [error, setError] = useState(null);

  const stringifiedParams = JSON.stringify(params);

  const filters = useMemo(() => {
    return withLang({
      ...params,
      page,
      limit: 8,
      locale: i18n.language,
    });
  }, [stringifiedParams, page, i18n.language]);

  useEffect(() => {
    setPage(1);
  }, [stringifiedParams, i18n.language]);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      setError(null);

      try {
        const res = await getProducts(filters);
        if (!active) return;

        const newProducts =  res?.data?.data || [];
        setProducts((prev) => {
          if (page === 1) return newProducts;

          const merged = [...prev, ...newProducts];

            return merged.filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.id === item.id),
          );
        });

        const next = res?.data?.next;

        if (next !== undefined) {
          setHasNext(Boolean(next));
        } else {
          setHasNext(newProducts.length > 0);
        }
      } catch (err) {
        if (!active) return;

        setError(err?.message || t("error_order"));
      } finally {
        if (active) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [filters]);

  const loadMore = useCallback(() => {
    if (hasNext && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext, loadingMore]);

  const reset = () => {
    setProducts([]);
    setPage(1);
  };

  return {
    products,
    loading,
    loadingMore,
    error,

    pagination: {
      page,
      hasNext,
      loadMore,
      reset,
    },
  };
};

export default useProducts;
