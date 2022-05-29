import redis from "redis";
import mongoose from "mongoose";

import { PaymentServices } from "../services"

export default () => {
  const subscriber = redis.createClient();
  const service = new PaymentServices();

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