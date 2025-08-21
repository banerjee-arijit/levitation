import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

const Userrouter = Router();

Userrouter.post("/auth/register", registerUser);
Userrouter.post("/auth/login", loginUser);
Userrouter.post("/auth/logout", logoutUser);

export default Userrouter;
