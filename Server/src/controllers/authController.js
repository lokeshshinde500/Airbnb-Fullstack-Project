import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // All fields are required
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use!", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = { name, email, password: hashedPassword };

    // Create a new user
    const newUser = await userModel.create(createUser);
    return res.status(201).json({
      message: "User register successfully.",
      user: {
        ...newUser._doc,
        password: "",
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error! Register" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // All fields are required
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // verify email
    const verifyUser = await userModel.findOne({ email: email });

    if (!verifyUser) {
      return res
        .status(400)
        .json({ message: "Email not registered!", success: false });
    }

    // match pass
    const verifyPass = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPass) {
      return res
        .status(400)
        .json({ message: "Invalid credentials!", success: false });
    }

    // valid user generate token
    const token = await generateToken(verifyUser._id);

    return res.status(400).json({
      message: "Login successfully.",
      token: token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error! Login" });
  }
};



// export const register = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// };
