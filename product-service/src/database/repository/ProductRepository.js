import { ProductModel } from "../../database"

class ProductRepository{
  async CreateProduct({ name, description, color, size, price, imageUrl, categories, stock }){
    try {
      const product = new ProductModel({
        name,
        description,
        color,
        size,
        price,
        imageUrl,
        categories,
        stock
      });
      const productResult = await product.save();
  
      return productResult;
    } catch (error) {
      throw new Error('Cannot create the product');
    }
  }

  async FindProductById({ id }){
    try {
      const existingProduct = await ProductModel.findById(id);

      return existingProduct;
    } catch (error) {
      throw new Error('Cannot get the product');
    }
  }

  async FindAllProducts(){
    try {
      const existingProducts = await ProductModel.find();

      return existingProducts;
    } catch (error) {
      throw new Error('Cannot get list all products');
    }
  }

  async UpdateProduct({ id, name, description, color, size, price, imageUrl, categories, stock }){
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id, 
        {
          name,
          description,
          color,
          size,
          price,
          imageUrl,
          categories,
          stock
        },
        { new: true }
      );

      return updatedProduct;
    } catch (error) {
      throw new Error('Cannot update the product');
    }
  }

  async DeleteProduct({ id }){
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      return deletedProduct;
    } catch (error) {
      throw new Error('Cannot delete the product');
    }
  }
}

export default ProductRepository;