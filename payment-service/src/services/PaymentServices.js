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
}

export default PaymentServices;