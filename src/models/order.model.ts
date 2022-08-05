import { model, Model, Schema } from 'mongoose';

interface IOrder {
  cartId: String;
  orderId: String;
  userId: String;
  shipping: Object;
  payment: Object;
  products: Array<any>;
}

interface IOrderMethods {
  isCheckPassword(password: String): Boolean;
}

type TOrderModel = Model<IOrder, {}, IOrderMethods>;

const OrderSchema = new Schema(
  {
    cartId: String,
    orderId: String,
    userId: String,
    shipping: Object,
    payment: Object,
    products: Array,
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

const OrderModel = model<IOrder, TOrderModel>('orders', OrderSchema);
export default OrderModel;
