import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.js";

const Userrouter = Router();

Userrouter.post("/auth/register", registerUser);
Userrouter.get("/me", authenticate, getUserDetails);
Userrouter.post("/auth/login", loginUser);
Userrouter.post("/auth/logout", logoutUser);

export default Userrouter;
