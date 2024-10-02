import jwt from "jsonwebtoken";
import constant from "../config/constant.js";

export const generateToken = async (payload) => {
  const token = jwt.sign({ userId: payload }, constant.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
