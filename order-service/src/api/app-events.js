import redis from "redis";
import mongoose from "mongoose";

import { OrderServices } from "../services"

export default () => {
  const subscriber = redis.createClient();
  const service = new OrderServices();

  // subscriber.on("message", async (channel, message) => {
  //   switch (channel) {
  //     case "CREATE_CART":
  //       const { id } = JSON.parse(message);
  //       const { data } = await service.CreateCart(mongoose.Types.ObjectId(id));
  //       if (data) {
  //         console.log("Cart created");
  //         console.log(data);
  //       }
  //       break;
  //   }
  // });

  // subscriber.subscribe("CREATE_CART");

  return subscriber;
}