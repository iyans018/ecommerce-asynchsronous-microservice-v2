import dotEnv from "dotenv";
import path from "path"

if (process.env.NODE_ENV !== 'prod') {
  dotEnv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
} else {
  dotEnv.config();
}

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  BASE_URL: process.env.BASE_URL,
}
 