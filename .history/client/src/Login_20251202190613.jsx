const API_URL = "https://YOUR_BACKEND_URL.onrender.com/api/auth/login";

const res = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
