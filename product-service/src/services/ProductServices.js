import { ProductRepository } from "../database";
import { FormateData } from "../utils";
import { validateProduct } from "../utils/validation";
import statusCodes from "../utils/status-codes";

class ProductServices{
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(inputUser, file){
    const { name, description, color, size, price, categories, stock } = inputUser;
    const { filename } = file;
    const { error } = validateProduct(inputUser);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const product = await this.repository.CreateProduct({ 
        name, description, color, size, price, 
        imageUrl: filename, categories, stock 
      });
      
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

  async UpdateProduct(params, inputUser, file){
    const { id } = params;
    const { name, description, color, size, price, categories, stock } = inputUser;
    const { filename } = file;
    const { error } = validateProduct(inputUser);

    if (error) return FormateData(statusCodes.BAD_REQUEST, null, error.details[0].message);

    try {
      const updatedProduct = await this.repository.UpdateProduct({ 
        id, name, description, color, size, price, 
        imageUrl: filename, categories, stock 
      });

      return FormateData(statusCodes.OK, updatedProduct, "Berhasil mengupdate product");
    } catch (error) {
      throw new Error('Failed to update the product');
    }
  }

  async DeleteProduct(params) {
    const { id } = params;

    try {
      const existingProduct = await this.repository.FindProductById({ id });
      if (!existingProduct) return FormateData(statusCodes.NOT_FOUND, null, "Product tidak ditemukan");

      const deletedProduct = await this.repository.DeleteProduct({ id });

      return FormateData(statusCodes.OK, deletedProduct, "Berhasil menghapus product");
    } catch (error) {
      throw new Error('Failed to delete the product');
    }
  }
}

export default ProductServices;