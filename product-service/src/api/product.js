import { ProductServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage, verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new ProductServices();

  app.post("/create", verifyToken, isAdmin, uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateProduct(req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/list", async (req, res, next) => {
    try {
      const { status, data, message } = await service.ListAllProducts();

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/detail/:id", async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadProduct(req.params);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/edit/:id", verifyToken, isAdmin, uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateProduct(req.params, req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/delete/:id", verifyToken, isAdmin, async (req, res, next) => {
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

  app.put("/cart/:productId/add", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.AddProductToCart(req.params, req.body, req.user);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:productId/remove", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.RemoveProductFromCart(req.params, req.user);
      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:productId/increase", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.IncreaseProductQuantityCart(req.params, req.user);

      responseAPI(res, status, data, message); 
    } catch (error) {
      next(error);
    }
  });

  app.put("/cart/:productId/decrease", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.DecreaseProductQuantityCart(req.params, req.user);
      
      responseAPI(res, status, data, message); 
    } catch (error) {
      next(error);
    }
  });
}
