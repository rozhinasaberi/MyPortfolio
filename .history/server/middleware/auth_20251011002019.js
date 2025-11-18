import jwt from "jsonwebtoken";

export const requireSignin = (req, res, next) => {
  // Accept Bearer token or cookie token
  const auth = req.headers.authorization;
  const token = (auth && auth.startsWith("Bearer ")) ? auth.slice(7) : (req.cookies?.token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    req.auth = { _id: payload._id, email: payload.email, name: payload.name };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid/Expired token" });
  }
};
