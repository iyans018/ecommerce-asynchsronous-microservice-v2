import { OrderServices } from "../services";
import { responseAPI, publishMessage, subscribeMessage } from "../utils";
import { verifyToken, isAdmin } from "./middleware";
import env from "../config";

export default (app, channel) => {
  const service = new OrderServices();
  subscribeMessage(channel, service);

  app.post("/create", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateOrder(req.user, req.body);

      if (data) publishMessage(channel, env.PRODUCT_BINDING_KEY, JSON.stringify({ event: "EMPTY_CART", data }));

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
