import { PaymentRepository } from "../database";
import { FormateData } from "../utils";
import statusCodes from "../utils/status-codes";

class PaymentServices{
  constructor() {
    this.repository = new PaymentRepository();
  }

}

export default PaymentServices;