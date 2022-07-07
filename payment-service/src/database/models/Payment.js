import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId },
  amount: { type: Number },
  status: { type: Number, default: 0 },
  method: { type: String },
  expiryDate: { type: Date }
}, { timestamps: true });

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;