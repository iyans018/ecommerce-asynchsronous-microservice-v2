import { ProductServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage, verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new ProductServices();

  app.post("/product", verifyToken, isAdmin, uploadImage.single("imageUrl"), async (req, res, next) => {
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

  app.put("/product/:id", verifyToken, isAdmin, uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateProduct(req.params, req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/product/:id", verifyToken, isAdmin, async (req, res, next) => {
    try {
      const { status, data, message } = await service.DeleteProduct(req.params);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/cart", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadUserCart(req.user);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);  
    }
  });

  app.put("/cart/:id/:productId/add", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.AddProductToCart(req.params, req.body, req.user);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:id/:productId/remove", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.RemoveProductFromCart(req.params, req.user);
      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:id/:productId/plus", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.IncreaseProductQuantityCart(req.params, req.user);

      responseAPI(res, status, data, message); 
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:id/:productId/minus", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.DecreaseProductQuantityCart(req.params, req.user);
      
      responseAPI(res, status, data, message); 
    } catch (error) {
      next(error);
    }
  });
}
