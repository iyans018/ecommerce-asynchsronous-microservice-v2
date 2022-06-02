import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  order: { type: Schema.Types.ObjectId },
  type: { type: String },
  cost: { type: Number },
  address: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    phoneNumber: { type: String }
  },
  status: { type: Number, default: 1 },
}, { timestamps: true });

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;