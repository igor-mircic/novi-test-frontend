export const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://novi-test-backend.onrender.com"
    : "http://localhost:4000";
