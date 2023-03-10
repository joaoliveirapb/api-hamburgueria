import { Router } from 'express';
import { ordersController } from './controllers/ordersController.js';

const routes = Router();

routes.post('/order', ordersController.logMethod, ordersController.createOrder)

routes.get('/order', ordersController.logMethod, ordersController.listOrders)

routes.get('/order/:id', ordersController.logMethod, ordersController.checkUserId, ordersController.listOrdersById)

routes.put('/order/:id', ordersController.logMethod, ordersController.checkUserId, ordersController.updateOrder)

routes.patch('/order/:id', ordersController.logMethod, ordersController.checkUserId, ordersController.updateOrderStatus)

routes.delete('/order/:id', ordersController.logMethod, ordersController.checkUserId, ordersController.deleteOrders)

export { routes }