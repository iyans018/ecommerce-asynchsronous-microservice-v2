import { PaymentModel } from "../../database"

class PaymentRepository {
  async CreatePayment({ order, amount, status, method, expiryDate }) {
    try {
      const payment = new PaymentModel({ order, amount, method, expiryDate });
      const paymentResult = await payment.save();

      return paymentResult
    } catch (error) {
      throw new Error('Cannot create payment');
    }
  }
}

export default PaymentRepository;