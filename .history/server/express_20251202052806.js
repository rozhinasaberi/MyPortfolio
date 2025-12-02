import cors from "cors";

app.use(cors({
  origin: [
    "https://<your-frontend-url>.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));
