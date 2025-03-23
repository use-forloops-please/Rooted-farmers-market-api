import { Request, Response } from 'express';
import Vendor, { IVendor } from '../models/vendor';
import Product from '../models/product';

// Get all vendors
export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Get a single vendor by ID
export const getVendorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    
    // Get vendor's products
    const products = await Product.find({ vendor: req.params.id });
    
    res.status(200).json({
      ...vendor.toObject(),
      products
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Create a new vendor
export const createVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Update a vendor
export const updateVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Delete a vendor
export const deleteVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    // First check if vendor has products
    const productsCount = await Product.countDocuments({ vendor: req.params.id });
    if (productsCount > 0) {
      res.status(400).json({ 
        message: 'Cannot delete vendor with associated products. Remove products first.' 
      });
      return;
    }
    
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};