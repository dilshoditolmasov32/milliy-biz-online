import { useNavigate } from "react-router-dom";
import { Search, Loader2, AlertCircle } from "lucide-react";

export default function SearchDropdown({
  suggestions,
  isLoading,
  error,
  query,
  dropdownRef,
  onClose,
}) {
  const navigate = useNavigate();

  const handleSuggestionClick = (item) => {
    navigate(`/products/${item.id}`, { state: { product: item } });
    onClose();
  };

  const handleShowAll = () => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <div className="search-dropdown-live" ref={dropdownRef}>
      {isLoading && (
        <div className="search-dropdown-live__loading">
          <Loader2 size={18} className="spin" />
          <span>Qidirilmoqda...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="search-dropdown-live__error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {!isLoading && !error && suggestions.length > 0 && (
        <>
          <ul className="search-dropdown-live__list">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="search-dropdown-live__item"
                onClick={() => handleSuggestionClick(item)}
              >
                {/* Rasm */}
                {item.image && (
                  <div className="search-dropdown-live__item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}

                {/* Ma'lumot */}
                <div className="search-dropdown-live__item-info">
                  <span className="search-dropdown-live__item-name">
                    {highlightMatch(item.name, query)}
                  </span>
                  {item.category && (
                    <span className="search-dropdown-live__item-category">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Narx */}
                {item.price && (
                  <span className="search-dropdown-live__item-price">
                    {Number(item.price).toLocaleString()} so'm
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Hammasini ko'rish */}
          <button
            className="search-dropdown-live__show-all"
            onClick={handleShowAll}
          >
            <Search size={15} />
            &nbsp; "{query}" bo'yicha barcha natijalar
          </button>
        </>
      )}

      {/* Bo'sh natija */}
      {!isLoading &&
        !error &&
        suggestions.length === 0 &&
        query.length >= 2 && (
          <div className="search-dropdown-live__empty">
            Natija topilmadi — "{query}"
          </div>
        )}
    </div>
  );
}

/** So'z ichida qidiruv qismini bold qilib ko'rsatish */
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part,
  );
}
