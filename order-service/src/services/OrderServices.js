import { OrderRepository } from "../database";
import { FormateData } from "../utils";
import { validateOrder } from "../utils/validation";
import statusCodes from "../utils/status-codes";

class ProductServices{
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
}

export default ProductServices;