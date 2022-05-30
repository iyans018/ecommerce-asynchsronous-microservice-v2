import redis from "redis";
import mongoose from "mongoose";

import { OrderServices } from "../services"

export default () => {
  const subscriber = redis.createClient();
  const service = new OrderServices();

  subscriber.on("message", async (channel, message) => {
    switch (channel) {
      case "ORDER_PAID":
        const { order } = JSON.parse(message);
        const { data } = await service.UpdateStatusOrder({ id: order }, { status: 2 });
        if (data) {
          console.log("Cart created");
          console.log(data);
        }
        break;
    }
  });

  subscriber.subscribe("ORDER_PAID");

  return subscriber;
}