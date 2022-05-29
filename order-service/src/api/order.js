import { OrderServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage, verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new OrderServices();

  app.post("/order", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateOrder(req.user, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error)
    }
  });
}
