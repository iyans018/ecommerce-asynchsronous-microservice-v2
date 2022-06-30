import redis from "redis";

import { PaymentServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new PaymentServices();
  const publisher = redis.createClient();

  app.post("/", async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreatePayment(req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/:id", async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdatePayment(req.params, req.body);

      if (data.status === 1) publisher.publish("ORDER_PAID", JSON.stringify({ order: data.order }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/:orderId", async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadPaymentByOrder(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}
