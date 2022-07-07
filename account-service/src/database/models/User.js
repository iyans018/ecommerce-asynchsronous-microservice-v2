import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String },
  gender: { 
    type: String, 
    enum: ["Male", "Female"]
  },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;