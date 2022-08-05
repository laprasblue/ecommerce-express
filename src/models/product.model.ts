import { Model, model, Schema } from 'mongoose';

interface IProductSpec {
  k: String;
  v: String;
}

interface IProduct {
  code: String;
  name: String;
  branch: String;
  description: String;
  releaseDate: Date;
  spec: { type: Array<IProductSpec>; default: [] };
}

interface IProductMethods {}

type TProductModel = Model<IProduct, {}, IProductMethods>;

const ProductSchema = new Schema(
  {
    code: String,
    name: String,
    branch: String,
    description: String,
    releaseDate: Date,
    spec: { type: Array, default: [] },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

const ProductModel = model<IProduct, TProductModel>('products', ProductSchema);
export default ProductModel;
