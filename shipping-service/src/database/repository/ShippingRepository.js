import { ShippingModel } from "../../database"

class ShippingRepository {
    async CreateShipping({ user, order, type, cost, address }) {
        try {
            const shipping = new ShippingModel({ user, order, type, cost, address });
            const shippingResult = await shipping.save();

            return shippingResult
        } catch (error) {
            throw new Error('Cannot create shippment');
        }
    }

    async UpdateShippingStatus({ id, status }) {
        try {
            const shipping = await ShippingModel.findByIdAndUpdate(id, { status }, { new: true });

            return shipping
        } catch (error) {
            throw new Error('Cannot update shipping status');
        }
    }

    async ReadShippingByOrder({ order }) {
        try {
            const shipping = await ShippingModel.findOne({ order });

            return shipping;
        } catch (error) {
            throw new Error('Cannot read shipping by order');
        }
    }
}

export default ShippingRepository;