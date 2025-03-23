import express from 'express';
import { 
  getVendors, 
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor
} from '../controllers/vendorController';

const router = express.Router();

// GET /api/vendors - Get all vendors
router.get('/', getVendors);

// GET /api/vendors/:id - Get a single vendor
router.get('/:id', getVendorById);

// POST /api/vendors - Create a new vendor
router.post('/', createVendor);

// PUT /api/vendors/:id - Update a vendor
router.put('/:id', updateVendor);

// DELETE /api/vendors/:id - Delete a vendor
router.delete('/:id', deleteVendor);

export default router;