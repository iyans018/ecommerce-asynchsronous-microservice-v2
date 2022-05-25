import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  description: { type: String },
  color: { type: String },
  size: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  categories: [{ type: String }],
  stock: { type: Number }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;