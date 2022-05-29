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
        const createCart = await service.CreateCart(mongoose.Types.ObjectId(id));
        if (createCart.data) {
          console.log("Cart created");
          console.log(createCart.data);
        }
        break;
      case "EMPTY_CART":
        const { cart } = JSON.parse(message);
        const emptyCart = await service.EmptyProductsInCart(mongoose.Types.ObjectId(cart));
        if (emptyCart.data) {
          console.log("Cart emptied");
          console.log(emptyCart.data);
        }
        break;
    }
  });

  subscriber.subscribe("CREATE_CART");
  subscriber.subscribe("EMPTY_CART");

  return subscriber;
}