import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: { type: String },
  type: { type: String, enum: ['activation', 'reset-password'] },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;