import dotEnv from "dotenv";
import path from "path"

if (process.env.NODE_ENV !== 'prod') {
  dotEnv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
} else {
  dotEnv.config();
}

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  BASE_URL: process.env.BASE_URL,
}
