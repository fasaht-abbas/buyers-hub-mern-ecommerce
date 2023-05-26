import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const braintreeTokenController = async (req, res) => {
  // breaintree payment gateway

  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, orderAddress } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const orderProducts = [];

    for (const item of cart) {
      const newQuantity = (await item.quantity) - item.amount;
      const updateQuantity = await productModel.findByIdAndUpdate(
        item._id,
        { quantity: newQuantity },
        { new: true }
      );
      orderProducts.push({
        product: item._id,
        amount: item.amount,
      });
    }
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            items: orderProducts,
            payment: result,
            buyer: req.user._id,
            orderAddress: orderAddress,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/////////////////////   user order controller

export const userOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name")
      .populate("items.amount")
      .populate("items.product", "-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "error while getting the orders",
    });
  }
};

//// Get all orders ON the admin end

export const adminOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .select("-photo")
      .populate("buyer", "name")
      .populate("items.amount")
      .populate("items.product", "-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: "error while getting the orders",
    });
  }
};

///////// updating the order status

export const updateStatusController = async (req, res) => {
  try {
    const { id, value } = req.body;
    const updated = await orderModel.findByIdAndUpdate(
      id,
      { status: value },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
  }
};
