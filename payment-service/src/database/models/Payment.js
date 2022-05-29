import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  shippingType: { type: String },
  shippingCost: { type: Number },
  amount: { type: Number },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    phoneNumber: { type: String }
  },
  products: [
    { 
      product: { type: Schema.Types.ObjectId }, 
      quantity: { type: Number },
      price: { type: Number },
      totalPrice: { type: Number }
    }
  ],
  status: { type: Number, default: 1 },
  cart: { type: Schema.Types.ObjectId }
}, { timestamps: true });

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;