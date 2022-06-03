import { ShippingRepository } from "../database";
import { FormateData } from "../utils";
import statusCodes from "../utils/status-codes";
import { validateShipping, validateStatusShipping } from "../utils/validation";
import env from "../config";

class ShippingServices{
  constructor() {
    this.repository = new ShippingRepository();
  }

  async CreateShipping(user, userInputs) {
    const { order, type, cost, address } = userInputs;
    const { id } = user;
    const { error } = validateShipping(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const shipping = await this.repository.CreateShipping({ user: id, order, type, cost, address });

      return FormateData(statusCodes.OK, shipping, "Berhasil membuat data shipping");
    } catch (error) {
      throw new Error("Failed to create shipping");
    }
  }

  async UpdateShippingStatus(params, userInputs) {
    const { id } = params;
    const { status } = userInputs;
    const { error } = validateStatusShipping(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const shipping = await this.repository.UpdateShippingStatus({ id, status });

      return FormateData(statusCodes.OK, shipping, "Berhasil update status shipping");
    } catch (error) {
      throw new Error("Failed to update shipping status");
    }
  }

  async ReadShippingByOrder(params) {
    const { orderId } = params;

    try {
      const shipping = await this.repository.ReadShippingByOrder({ order: orderId });

      return FormateData(statusCodes.OK, shipping, "Berhasil membaca data shipping");
    } catch (error) {
      throw new Error("Failed to read shipping by order");
    }
  }
}

export default ShippingServices;