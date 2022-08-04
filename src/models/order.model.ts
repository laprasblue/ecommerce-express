import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
});

export default OrderSchema;
