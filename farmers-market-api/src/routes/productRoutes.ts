import express from 'express';
import { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getProducts);

// GET /api/products/:id - Get a single product
router.get('/:id', getProductById);

// POST /api/products - Create a new product
router.post('/', createProduct);

// PUT /api/products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', deleteProduct);

export default router;