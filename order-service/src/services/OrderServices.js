import { OrderRepository } from "../database";
import { FormateData } from "../utils";
import statusCodes from "../utils/status-codes";

class ProductServices{
  constructor() {
    this.repository = new OrderRepository();
  }

}

export default ProductServices;