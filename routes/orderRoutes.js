import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  adminOrdersController,
  braintreePaymentController,
  braintreeTokenController,
  updateStatusController,
  userOrdersController,
} from "../controllers/orderControllers.js";

const router = express.Router();

//////////////////////////////     Payment gateway

//token
router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

// ORDER  ROUTES

// USER END//
router.get("/user-orders", requireSignIn, userOrdersController);

/// admin end
router.get("/admin-orders", requireSignIn, isAdmin, adminOrdersController);

// update order status
router.put("/update-status", requireSignIn, isAdmin, updateStatusController);

export default router;
