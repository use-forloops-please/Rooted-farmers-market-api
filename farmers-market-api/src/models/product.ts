import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  vendor: mongoose.Types.ObjectId;
  description: string;
  inStock: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    description: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);