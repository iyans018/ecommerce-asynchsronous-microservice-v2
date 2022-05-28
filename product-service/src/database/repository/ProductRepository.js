import { ProductModel, CartModel } from "../../database"

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

  async CreateCart({ user }) {
    try {
      const cart = new CartModel({ user });
      const cartResult = await cart.save();

      return cartResult;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot create the cart');
    }
  }

  async FindUserCart({ user }) {
    try {
      const existingCart = await CartModel.findOne({ user });

      return existingCart;
    } catch (error) {
      throw new Error('Cannot get the cart');
    }
  }

  async FindProductItemInCart(user, { productId }) {
    try {
      const cart = await CartModel.findOne({ user, "products.product": productId });
      
      if (!cart) return null

      const productsInCart = cart.products.map(product => product);
      const existingProductInCart = productsInCart.find(product => {
        return product.product.toString() === productId;
      });

      return existingProductInCart;
    } catch (error) {
      throw new Error('Cannot find item in cart');
    }
  }

  async AddProductToCart(user, { product, quantity, price, totalPrice }) {
    try {
      const cart = await CartModel.findOneAndUpdate(
        { user }, 
        {
          $push: {
            products: {
              product,
              quantity,
              price,
              totalPrice
            }
          }
        },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error('Cannot add item to cart');
    }
  }

  async UpdateProductQuantityInCart(user, { productId, quantity }) {
    try {
      const productItemInCart = await this.FindProductItemInCart(user, { productId });
      const cart = await CartModel.findOneAndUpdate(
        { user, "products.product": productId },
        { $set: { "products.$.quantity": productItemInCart.quantity + quantity } },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error('Cannot update product quantity in cart');
    }
  }

  async RemoveProductFromCart(user, { productId }) {
    try {
      const cart = await CartModel.findOneAndUpdate(
        { user },
        { $pull: { products: { product: productId } } },
        { new: true }
      );

      return cart;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot remove item from cart');
    }
  }
}

export default ProductRepository;