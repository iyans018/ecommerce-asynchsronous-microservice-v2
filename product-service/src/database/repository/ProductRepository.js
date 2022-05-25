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
}

export default ProductRepository;