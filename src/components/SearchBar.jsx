import { useState, useRef, useEffect } from "react";
import { SearchIcon, PortionIcon } from "./Icons";

function SearchBar({ value, onChange, onSearch, placeholder = "Cari makanan favoritmu..." }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const suggestions = [
    "Mie Ayam", "Nasi Padang", "Sate", "Bento",
    "Pizza", "Burger", "Tacos", "Sushi",
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(value);
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      onChange?.({ target: { value: "" } });
      inputRef.current?.blur();
    }
  };

  const handleTagClick = (tag) => {
    onChange?.({ target: { value: tag } });
    onSearch?.(tag);
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-input-wrap">
          <span className="search-icon">
            <SearchIcon size="18px" />
          </span>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            className="search-input"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            autoComplete="off"
            aria-label="Cari makanan"
          />
          {value && (
            <button
              className="search-clear"
              onClick={() => onChange?.({ target: { value: "" } })}
              aria-label="Hapus pencarian"
              title="Hapus"
            >
              ✕
            </button>
          )}
          <button
            className="search-btn"
            id="search-btn"
            onClick={() => onSearch?.(value)}
            aria-label="Cari"
          >
            Cari
          </button>
        </div>

        {/* Quick Tags */}
        <div className="search-tags">
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Populer:
          </span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              className="search-tag"
              onClick={() => handleTagClick(tag)}
              style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <PortionIcon size="12px" />
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
