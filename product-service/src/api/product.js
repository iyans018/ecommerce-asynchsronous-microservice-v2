import { ProductServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage } from "./middleware";

export default (app) => {
  const service = new ProductServices();

  app.post("/product", uploadImage.single("imageUrl"), async (req, res, next) => {
    try {
      // const objectBody = {
      //   name: req.body.name,
      //   description: req.body.description,
      //   color: req.body.color,
      //   size: req.body.size,
      //   price: req.body.price,
      //   categories: [req.body.categories],
      //   stock: req.body.stock,
      // }
      const { status, data, message } = await service.CreateProduct(req.body, req.file);

      responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}