import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      price: { type: Number },
      totalPrice: { type: Number }
    }
  ],
  user: { type: Schema.Types.ObjectId },
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;