import { model, Model, Schema } from 'mongoose';

interface ICart {
  userId: String;
  cartId: String;
  status: Boolean;
  modifiedOn: Date;
  products: Array<String>;
}

interface ICartMethods {}

type TCartModel = Model<ICart, {}, ICartMethods>;

const CartSchema = new Schema(
  {
    userId: String,
    cartId: String,
    status: { type: Boolean, default: true },
    modifiedOn: { type: Date, default: Date.now() },
    products: Array,
  },
  {
    collection: 'carts',
    timestamps: true,
  }
);

const CartModel = model<ICart, TCartModel>('User', CartSchema);

export default CartModel;
