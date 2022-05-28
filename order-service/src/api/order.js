import { OrderServices } from "../services";
import { responseAPI } from "../utils";
import { uploadImage, verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new OrderServices();

  app.get("/", (req, res) => {
    try {
      responseAPI(res, 200, { name: "Oktavian Aji" }, "Berhasil");
    } catch (error) {
      next(error)
    }
  });
}
