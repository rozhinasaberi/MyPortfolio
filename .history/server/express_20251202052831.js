import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

app.use(cors({
  origin: [
    "https://<your-frontend-url>.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

export default app;
