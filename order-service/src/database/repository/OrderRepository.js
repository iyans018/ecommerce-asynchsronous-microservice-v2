import { OrderModel } from "../../database"

class OrderRepository{
  async CreateOrder(order){
    try{
      const newOrder = new OrderModel(order);
      const orderResult = await newOrder.save();
      
      return orderResult;
    }catch(error){
      throw new Error('Cannot create an order');
    }
  }

  async ReadOrder({ id }) {
    try {
      const existingOrder = await OrderModel.findById(id);

      return existingOrder;
    } catch (error) {
      throw new Error('Cannot read an order');
    }
  }

  async ListUserOrders({ user }) {
    try {
      const existingUserOrders = await OrderModel.find({ user });

      return existingUserOrders;
    } catch (error) {
      throw new Error('Cannot list user orders');
    }
  }

  async UpdateStatusOrder(id, { status }) {
    try {
      const existingOrder = await OrderModel.findById(id);
      existingOrder.status = status;
      const updatedOrder = await existingOrder.save();
      
      return updatedOrder;
    } catch (error) {
      throw new Error('Cannot update status order');
    }
  }
}

export default OrderRepository;