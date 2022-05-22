import { UserService } from "../services";
import { verifyToken, isAdmin, uploadImage } from "./middleware";
import { responseAPI } from "../utils";

export default (app) => {
  const service = new UserService();

  app.get("/users", verifyToken, isAdmin, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ListUsers();

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.get("/users/:id", verifyToken,  async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadUser(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/users/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateUser(req.params, req.user, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/users/:id/avatar", verifyToken, uploadImage.single("avatar"), async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateAvatar(req.params, req.user, req.file);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/users/:id", verifyToken, isAdmin, async (req, res, next) => {
    try {
      const { status, data, message } = await service.DeleteUser(req.params);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/address", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.CreateAddress(req.user, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/address", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ReadAddresses(req.user);
      
      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/address/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.UpdateAddress(req.params, req.user, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/address/:id", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.DeleteAddress(req.params, req.user);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

}