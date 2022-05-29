import { OrderModel } from "../../database"

class ProductRepository{
  async CreateOrder(order){
    try{
      const newOrder = new OrderModel(order);
      const orderResult = await newOrder.save();
      
      return orderResult;
    }catch(error){
      throw new Error('Cannot create an order');
    }
  }
}

export default ProductRepository;