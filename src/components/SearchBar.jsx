// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flex: 1, gap: 8 }}>
      <input
        placeholder="Enter city (e.g., Mumbai, Tokyo)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
