import redis from "redis";
import mongoose from "mongoose";

import { ProductServices } from "../services"

export default () => {
  const subscriber = redis.createClient();
  const service = new ProductServices();

  subscriber.on("message", async (channel, message) => {
    switch (channel) {
      case "CREATE_CART":
        const { id } = JSON.parse(message);
        const { data } = await service.CreateCart(mongoose.Types.ObjectId(id));
        console.log(data);
        break;
    }
  });

  subscriber.subscribe("CREATE_CART");

  return subscriber;
}