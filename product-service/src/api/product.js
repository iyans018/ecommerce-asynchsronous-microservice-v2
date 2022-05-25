import { ProductServices } from "../services";
import { responseAPI } from "../utils";

export default (app) => {
  const service = new ProductServices();

  app.post("/product", async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateProduct(req.body);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}