import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import constant from "../config/constant.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Login required!" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, constant.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
