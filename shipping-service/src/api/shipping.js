import axios from "axios";
import { ShippingServices } from "../services";
import { responseAPI, publishMessage } from "../utils";
import { verifyToken, isAdmin } from "./middleware";
import env from "../config";

export default (app, channel) => {
  const service = new ShippingServices();

  app.post("/", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateShipping(req.user, req.body);

      if (data) {
        const response = await axios.put(`http://localhost:3000/order/status/${data.order}`, { status: 3 });
        console.log(response.data.message);
        console.log(response.data);
      }

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
