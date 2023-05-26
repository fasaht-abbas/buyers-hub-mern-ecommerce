import express from "express";
import {
  contactController,
  getUsersController,
  loginController,
  registerController,
  resetPassword,
  updateAdminController,
  updatePassword,
  updateProfileController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

//router
const router = express.Router();

// REGISTER || POST MEATHOD
router.post("/register", registerController);

//LOGIN || POST MEATHOD
router.post("/login", loginController);

//PRIVATE ROUTE USER
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//PRIVATE ROUTE ADMIN
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// FORGET_PASSWORD
router.post("/forgot-password", resetPassword);

router.put("/update-password", updatePassword);

///// Update the profile settings
router.put("/update-profile", requireSignIn, updateProfileController);
///// Update the admin settings
router.put("/update-admin", requireSignIn, isAdmin, updateAdminController);

// getting all the users on the admin side

router.get("/get-users", requireSignIn, isAdmin, getUsersController);

// contact form

router.post("/contact-mail", requireSignIn, contactController);

export default router;
