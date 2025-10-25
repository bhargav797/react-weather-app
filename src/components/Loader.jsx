// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: 16 }}>
      <div role="status" aria-live="polite">Loading...</div>
    </div>
  );
}
