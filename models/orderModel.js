import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "products",
        },
        amount: {
          type: Number,
        },
      },
    ],
    orderAddress: {
      type: String,
      required: true,
    },
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processing",
      enum: [
        "Not Processing",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
  },
  { timestamps: true }
);
export default mongoose.model("order", orderSchema);
