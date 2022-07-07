import { ShippingServices } from "../services";
import { responseAPI, publishMessage } from "../utils";
import { verifyToken, isAdmin } from "./middleware";
import env from "../config";

export default (app, channel) => {
  const service = new ShippingServices();

  app.post("/", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateShipping(req.user, req.body);

      // if (data) publisher.publish("ORDER_SENT", JSON.stringify({ order: data.order }));
      if (data) publishMessage(channel, env.ORDER_BINDING_KEY, JSON.stringify({ event: "ORDER_SENT", data }));

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
