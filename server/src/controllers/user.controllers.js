import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await user.findOne({ username, email, password });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await user.create({ username, email, password });
    res.status(200).json({
      success: true,
      message: `user registered successfully ${newUser}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email });
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser || !isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
