import { ProductRepository } from "../database";
import { FormateData } from "../utils";
import { validateProduct } from "../utils/validation";
import statusCodes from "../utils/status-codes";

class ProductServices{
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(inputUser){
    const { name, description, color, size, price, imageUrl, categories, stock } = inputUser;
    const { error } = validateProduct(inputUser);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const product = await this.repository.CreateProduct({ name, description, color, size, price, imageUrl, categories, stock });
      
      return FormateData(statusCodes.OK, product, "Berhasil menambahkan product");
    } catch (error) {
      throw new Error('Failed to create the product');
    }
  }
}

export default ProductServices;