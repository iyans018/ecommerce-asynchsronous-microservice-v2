import redis from "redis";

import { PaymentServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new PaymentServices();
  const publisher = redis.createClient();

  app.get("/", (req, res, next) => {
    return responseAPI(res, 200, { message: "Hello World" }, "Mantabs");
  });
}
