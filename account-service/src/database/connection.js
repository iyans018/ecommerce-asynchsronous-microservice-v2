import mongoose from "mongoose";
import env from "../config";

export default async() => {
  try {
    await mongoose.connect(env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db Connected');
  } catch (error) {
    console.log('Error ============')
    console.log(error);
    process.exit(1);
  }
};