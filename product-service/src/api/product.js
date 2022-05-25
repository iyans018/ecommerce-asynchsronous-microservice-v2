import { ProductServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage } from "./middleware";

export default (app) => {
  const service = new ProductServices();

  app.post("/product", uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateProduct(req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/product/:id", async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadProduct(req.params);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/product", async (req, res, next) => {
    try {
      const { status, data, message } = await service.ListAllProducts();

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/product/:id", uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateProduct(req.params, req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/product/:id", async (req, res, next) => {
    try {
      const { status, data, message } = await service.DeleteProduct(req.params);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}
