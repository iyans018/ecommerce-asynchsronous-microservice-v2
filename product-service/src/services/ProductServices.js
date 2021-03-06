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
    if (!file) return FormateData(statusCodes.BAD_REQUEST, null, "Tidak ada file yag diupload");

    const { filename } = file;
    const { error } = validateProduct({ imageUrl: filename, ...inputUser });
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
    const { error } = validateProduct({ imageUrl: filename, ...inputUser });

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

  async CreateCart(userId) {
    try {
      const cart = await this.repository.CreateCart({ user: userId });
      
      return FormateData(statusCodes.OK, cart, "Berhasil menambahkan cart");
    } catch (error) {
      throw new Error('Failed to create the cart');
    }
  }

  async ReadUserCart(user) {
    const { id } = user;

    try {
      const existingCart = await this.repository.FindUserCart({ user: id });

      return FormateData(statusCodes.OK, existingCart, "Berhasil mengambil cart");
    } catch (error) {
      throw new Error('Failed to read user cart');
    }
  }

  async AddProductToCart(params, inputUser, user) {
    const { productId } = params;
    const { quantity } = inputUser;
    const { id } = user;

    if(!quantity) return FormateData(statusCodes.BAD_REQUEST, null, "Quantity tidak boleh kosong");

    try {
      const existingProduct = await this.repository.FindProductById({ id: productId });
      let cart;
      
      const isItemExistInCart = await this.repository.FindProductItemInCart(id, { productId });
      
      if (isItemExistInCart) {
        cart = await this.repository.UpdateProductQuantityInCart(id, { productId, quantity }, "increase");
      } else {
        const dataProductToAdd = {
          product: productId,
          quantity,
          price: existingProduct.price,
          totalPrice: existingProduct.price * quantity,
        };
        cart = await this.repository.AddProductToCart(id, dataProductToAdd);
      }

      return FormateData(statusCodes.OK, cart, "Berhasil menambahkan product ke cart");
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add product to cart');
    }
  }

  async RemoveProductFromCart(params, user) {
    const { productId } = params;
    const { id } = user;

    try {
      const updatedCart = await this.repository.RemoveProductFromCart(id, { productId });

      return FormateData(statusCodes.OK, updatedCart, "Berhasil menghapus product dari cart");
    } catch (error) {
      throw new Error('Failed to remove product from cart');
    }
  }

  async IncreaseProductQuantityCart(params, user) {
    const { productId } = params;
    const { id } = user;
    
    try {
      const updatedCart = await this.repository.UpdateProductQuantityInCart(id, { productId, quantity: 1 }, "increase");
      
      return FormateData(statusCodes.OK, updatedCart, "Berhasil menambahkan quantity product di cart");
    } catch (error) {
      console.log(error)
      throw new Error('Failed to increase product quantity cart');
    }
  }

  async DecreaseProductQuantityCart(params, user) {
    const { productId } = params;
    const { id } = user;
    
    try {
      const updatedCart = await this.repository.UpdateProductQuantityInCart(id, { productId, quantity: 1 }, "decrease");
      
      return FormateData(statusCodes.OK, updatedCart, "Berhasil menambahkan quantity product di cart");
    } catch (error) {
      console.log(error)
      throw new Error('Failed to increase product quantity cart');
    }
  }

  async EmptyProductsInCart(cartId) {
    try {
      const updatedCart = await this.repository.EmptyProductCart({ id: cartId });
      
      return FormateData(statusCodes.OK, updatedCart, "Berhasil mengosongkan cart");
    } catch (error) {
      throw new Error('Failed to empty products in cart');
    }
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    const { event, data } = payload;

    switch(event) {
      case 'CREATE_CART':
        this.CreateCart(data._id);
        break;
      case 'EMPTY_CART':
        this.EmptyProductsInCart(data.cart);
      default:
        break;
    }
  }
}

export default ProductServices;