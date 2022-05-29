import redis from "redis";

import { OrderServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage, verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new OrderServices();
  const publisher = redis.createClient();

  app.post("/order", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateOrder(req.user, req.body);

      publisher.publish("EMPTY_CART", JSON.stringify({ cart: data.cart }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });
}