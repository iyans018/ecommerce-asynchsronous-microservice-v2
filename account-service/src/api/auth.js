import redis from "redis";

import { AuthService } from "../services";
import { verifyToken } from "./middleware";
import { responseAPI } from "../utils";

export default (app) => {
  const service = new AuthService();
  const publisher = redis.createClient();

  app.get("/", (req, res) => res.send("hello"));

  app.post("/auth/register", async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, gender } = req.body;
      const { status, data, message } = await service.Register({ firstName, lastName, email, password, gender });

      if (data) publisher.publish('CREATE_CART', JSON.stringify({ id: data._id }));

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { status, data, message } = await service.Login({ email, password });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/resend-activation", async (req, res, next) => {
    try {
      const { email } = req.body;
      const { status, data, message } = await service.ResendActivation({ email });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  })

  app.put("/auth/activate/:id/:token", async (req, res, next) => {
    try {
      const { id, token } = req.params;
      const { status, data, message } = await service.Activate({ id, token });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/forgot-password", async (req, res, next) => {
    try {
      const { email } = req.body;
      const { status, data, message } = await service.ForgotPassword({ email });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/auth/reset-password/:id/:token", async (req, res, next) => {
    try {
      const { id, token } = req.params;
      const { password, passwordConfirmation } = req.body;
      const { status, data, message } = await service.ResetPassword({ id, token }, { password, passwordConfirmation });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/refresh-token", async (req, res, next) => {
    try {
      const { token } = req.body;
      const { status, data, message } = await service.RefreshToken({ token });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.put("/auth/change-password", verifyToken, async (req, res, next) => {
    try {
      const { status, data, message } = await service.ChangePassword(req.user, req.body);

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/auth/logout", verifyToken, async (req, res, next) => {
    try {
      const refreshToken = req.headers["x-refresh-token"];
      const { status, data, message } = await service.Logout({ refreshToken });

      return responseAPI(res, status, data, message);
    } catch (error) {
      next(error);
    }
  });
}