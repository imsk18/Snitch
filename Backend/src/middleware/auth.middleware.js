import jwt from "jsonwebtoken";

const token = req.cookies.token;
if (!token) {
  return res.status(401).json({ message: "Access denied" });
}

const decoded = jwt.verify(token, config.JWT_SECRET);