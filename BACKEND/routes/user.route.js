import express from "express";

import {
  register,
  login,
  updateProfile,
  logout,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleIUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(singleIUpload, register);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/logout").get(isAuthenticated, logout);

export default router;
