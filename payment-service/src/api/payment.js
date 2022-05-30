import redis from "redis";

import { PaymentServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new PaymentServices();
  const publisher = redis.createClient();

  app.post("/payment", async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreatePayment(req.body);

      publisher.publish("ORDER_PAID", JSON.stringify({ order: data.order }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}
