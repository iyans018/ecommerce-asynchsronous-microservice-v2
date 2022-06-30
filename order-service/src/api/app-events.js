import redis from "redis";

import { OrderServices } from "../services";
import statusOrder from "../utils/status-order";

export default () => {
  const subscriber = redis.createClient();
  const service = new OrderServices();

  subscriber.on("message", async (channel, message) => {
    switch (channel) {
      case "ORDER_PAID":
        const { order: paidOrder } = JSON.parse(message);
        const { data: orderPaidData } = await service.UpdateStatusOrder({ id: paidOrder }, { status: statusOrder.DIKEMAS });
        if (orderPaidData) {
          console.log("Order Paid");
          console.log(orderPaidData);
        }
        break;
      case "ORDER_SENT":
        const { order: shippingOrder } = JSON.parse(message);
        const { data: orderSentData } = await service.UpdateStatusOrder({ id: shippingOrder }, { status: statusOrder.DIKIRIM });

        if (orderSentData) {
          console.log("Order sent");
          console.log(orderSentData);
        }
        break;
    }
  });

  subscriber.subscribe("ORDER_PAID");
  subscriber.subscribe("ORDER_SENT");

  return subscriber;
}