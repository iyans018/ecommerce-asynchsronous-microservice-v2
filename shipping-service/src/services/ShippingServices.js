import { ShippingRepository } from "../database";
import { FormateData } from "../utils";
import statusCodes from "../utils/status-codes";
import { validatePayment } from "../utils/validation";
import env from "../config";

class ShippingServices{
  constructor() {
    this.repository = new ShippingRepository();
  }
}

export default ShippingServices;