import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: { type: String },
  createdAt: { 
    type: Date,
    default: Date.now,
    expires: 3600 
  },
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;