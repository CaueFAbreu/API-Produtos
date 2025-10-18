import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';

const productRoutes = Router();


const controller = new ProductController();


productRoutes.get('/', controller.findAll.bind(controller));


productRoutes.get('/:id', controller.findById.bind(controller));


productRoutes.post('/', controller.create.bind(controller));


productRoutes.put('/:id', controller.update.bind(controller));


productRoutes.delete('/:id', controller.delete.bind(controller));

export { productRoutes };
