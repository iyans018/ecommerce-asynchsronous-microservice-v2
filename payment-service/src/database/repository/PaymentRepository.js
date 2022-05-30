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

  async UpdatePaymentStatus({ id, status }) {
    try {
      const payment = await PaymentModel.findById(id);
      payment.status = status;
      const paymentResult = await payment.save();
      return paymentResult;
    } catch (error) {
      throw new Error('Cannot update payment');
    }
  }

  async ReadPaymentByOrder({ orderId }) {
    try {
      const existingPayment = await PaymentModel.findOne({ order: orderId });

      return existingPayment;
    } catch (error) {
      throw new Error('Cannot get payment by order');
    }
  }
}

export default PaymentRepository;