import { useRef } from "react";
import { useKey } from "../useKey";
export default function SearchBar({ query, setQuery, placeholder }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <div className="col-6 my-1">
      <input
        className="form-control me-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
}
