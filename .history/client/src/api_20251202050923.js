// client/src/api.js

// In dev: set VITE_API_BASE=http://localhost:3000
// In production on Render: leave it empty → same origin
export const API_BASE = import.meta.env.VITE_API_BASE || "";
