import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  description: string;
  location: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    contactEmail: { type: String },
    contactPhone: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>('Vendor', VendorSchema);