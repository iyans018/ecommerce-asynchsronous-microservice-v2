import redis from "redis";

import { ShippingServices } from "../services";
import { responseAPI } from "../utils";
import { verifyToken, isAdmin } from "./middleware";

export default (app) => {
  const service = new ShippingServices();
  const publisher = redis.createClient();

}
