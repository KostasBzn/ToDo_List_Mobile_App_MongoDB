import express from "express";
import {
  loggedUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import auth from "../middlewares/user-auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logged", auth, loggedUser);

export default userRoutes;
