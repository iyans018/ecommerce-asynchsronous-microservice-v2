import redis from "redis";

import { OrderServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new OrderServices();
  const publisher = redis.createClient();

  app.post("/create", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateOrder(req.user, req.body);

      if(data) publisher.publish("EMPTY_CART", JSON.stringify({ cart: data.cart }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });

  app.get("/list", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ListUserOrders(req.user);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });

  app.get("/detail/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadOrder(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });

  app.put("/status/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateStatusOrder(req.params, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });

  app.put("/cancel/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CancelOrder(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });
}
