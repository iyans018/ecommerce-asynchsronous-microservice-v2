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

  async ReadProduct(params) {
    const { id } = params;

    try {
      const existingProduct = await this.repository.FindProductById({ id });

      return FormateData(statusCodes.OK, existingProduct, "Berhasil mengambil product");
    } catch (error) {
      throw new Error('Failed to get the product');
    }
  }

  async ListAllProducts(){
    try {
      const existingProducts = await this.repository.FindAllProducts();

      return FormateData(statusCodes.OK, existingProducts, "Berhasil mengambil list product");
    } catch (error) {
      throw new Error('Failed to get list all products');
    }
  }
}

export default ProductServices;