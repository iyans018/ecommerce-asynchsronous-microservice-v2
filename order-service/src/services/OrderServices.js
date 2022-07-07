import { OrderRepository } from "../database";
import { FormateData } from "../utils";
import { validateOrder } from "../utils/validation";
import statusCodes from "../utils/status-codes";
import statusOrder from "../utils/status-order";

class OrderServices{
  constructor() {
    this.repository = new OrderRepository();
  }

  async CreateOrder(user, userInputs) {
    const { id } = user;
    const { shippingType, shippingCost, amount, shippingAddress, products, status, cart } = userInputs;
    const { error } = validateOrder({ user: id, ...userInputs });

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const order = await this.repository.CreateOrder({
        user: id,
        shippingType,
        shippingCost,
        amount,
        shippingAddress,
        products,
        status,
        cart,
      });

      return FormateData(statusCodes.CREATED, order, "Berhasil membuat order");
    } catch (error) {
      throw new Error('Failed to create an order');
    }
  }

  async ReadOrder(params) {
    const { id } = params;

    try {
      const order = await this.repository.ReadOrder({ id });

      return FormateData(statusCodes.OK, order, "Berhasil mengambil data order");
    } catch (error) {
      throw new Error('Failed to read an order');
    }
  }

  async ListUserOrders(user) {
    const { id } = user;

    try {
      const orders = await this.repository.ListUserOrders({ user: id });

      return FormateData(statusCodes.OK, orders, "Berhasil mengambil list user orders");
    } catch (error) {
      throw new Error('Failed to get list user orders');
    }
  }

  async UpdateStatusOrder(params, userInputs) {
    const { id } = params;
    const { status } = userInputs;

    if (!status) return FormateData(statusCodes.BAD_REQUEST, null, "Status tidak boleh kosong");

    try {
      const order = await this.repository.UpdateStatusOrder(id, { status });
      return FormateData(statusCodes.OK, order, "Berhasil mengubah status order");
    } catch (error) {
      console.log(error);
      console.log(error);
      throw new Error('Failed to update status order');
    }
  }

  async CancelOrder(params) {
    const { id } = params;
    const status = 0;

    try {
      const order = await this.repository.UpdateStatusOrder(id, { status });
      return FormateData(statusCodes.OK, order, "Berhasil cancel order");
    } catch (error) {
      throw new Error('Failed to cancel order');
    }
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    const { event, data } = payload;

    switch (event) {
      case 'ORDER_PAID':
        this.UpdateStatusOrder({ id: data.order }, { status: statusOrder.DIKEMAS });
        break;
      case 'ORDER_SENT':
        this.UpdateStatusOrder({ id: data.order }, { status: statusOrder.DIKIRIM });
      default:
        break;
    }
  }
}

export default OrderServices;