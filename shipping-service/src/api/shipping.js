import redis from "redis";

import { ShippingServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new ShippingServices();
  const publisher = redis.createClient();

  app.post("/", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateShipping(req.user, req.body);

      if (data) publisher.publish("ORDER_SENT", JSON.stringify({ order: data.order }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateShippingStatus(req.params, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/:orderId", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadShippingByOrder(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}
