import axios from "axios";
import { PaymentServices } from "../services";
import { responseAPI, publishMessage } from "../utils";
import { verifyToken, isAdmin } from "./middleware";
import env from "../config"

export default (app, channel) => {
  const service = new PaymentServices();

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

      if (data.status === 1) {
        const response = await axios.put(`http://localhost:3003/status/${data.order}`, { status: 2 });
        console.log(response.data.message);
        console.log(response.data);
      }

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
