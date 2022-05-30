import { PaymentRepository } from "../database";
import { FormateData } from "../utils";
import statusCodes from "../utils/status-codes";
import { validatePayment } from "../utils/validation";
import env from "../config";

class PaymentServices{
  constructor() {
    this.repository = new PaymentRepository();
  }

  async CreatePayment(userInputs) {
    const { order, amount, method } = userInputs;
    const { error } = validatePayment(userInputs);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const payment = await this.repository.CreatePayment({ 
        order,
        amount,
        method,
        expiryDate: new Date().setSeconds(new Date().getSeconds() + env.PAYMENT_EXPIRATION) 
      });

      return FormateData(statusCodes.OK, payment, "Berhasil membuat data payment");
    } catch (error) {
      throw new Error('Failed to create payment');
    }
  }

  async UpdatePayment(params, userInputs) {
    const { id } = params;
    const { status } = userInputs;

    if (!status) return FormateData(statusCodes.BAD_REQUEST, null, "Status harus diisi");

    try {
      const updatedPayment = await this.repository.UpdatePaymentStatus({ id, status });

      return FormateData(statusCodes.OK, updatedPayment, "Berhasil memperbarui data payment");
    } catch (error) {
      throw new Error('Failed to update payment');
    }
  }

  async ReadPaymentByOrder(params) {
    const { orderId } = params;

    try {
      const existingPayment = await this.repository.ReadPaymentByOrder({ orderId });

      return FormateData(statusCodes.OK, existingPayment, "Berhasil mendapatkan data payment berdasarkan order");
    } catch (error) {
      throw new Error('Failed to read payment by order');
    }
  }
}

export default PaymentServices;