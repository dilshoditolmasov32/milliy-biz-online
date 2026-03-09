import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import Skeleton from "../skeleton/Skeleton";
import { Link } from "react-router-dom";
import arrowR from "../../assets/img/arrowR.svg";
import ProductCard from "./ProductCard";

export default function Products({ title }) {
  const { t } = useTranslation();
  const searchQuery = useSelector((state) => state.search?.query) || "";
const { products, loading, loadingMore, pagination } = useProducts();

const { loadMore, hasNext } = pagination;

  if (loading) return <Skeleton count={8} />;

  const displayProducts = products?.filter((item) => {
    if (title === "Mahsus taklif.") return item.status === "mahsus_taklif";
    if (title === "Yangi mahsulotlar.") return item.status === "yangilik";
    return true;
  });

  return (
    <div className="container">
      <div className="products">
        <div className="products__wrap">
          <div className="products__top">
            <h2 className="products__top-title">{title}</h2>
            <Link to="/products" className="products__top-txt">
              <p className="products__top-text">{t("all")}</p>
              <img src={arrowR} alt="arrow icon" />
            </Link>
          </div>

          <div className="products__main">
            {displayProducts?.length > 0 ? (
              displayProducts.map((product) => (
                <ProductCard info={product} key={product.id} />
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                {t("subtitle")}
              </p>
            )}
          </div>
        </div>
      </div>

      {hasNext && (
        <div className="more-products">
          <button
            className="more-btn"
            onClick={loadMore}
            disabled={loadingMore} 
          >
            {loadingMore ? (
              <span className="more-btn__loading">
                <span className="more-btn__spinner" />
                {t("loading")}
              </span>
            ) : (
              t("products_more")
            )}
          </button>
        </div>
      )}
    </div>
  );
}
