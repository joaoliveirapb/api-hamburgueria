import { v4 as uuidv4 } from 'uuid';
import { orders } from '../orders.js';

const ordersController = {
  checkUserId(req, res, next) {
    const { id } = req.params;
  
    const index = orders.findIndex(order => order.id === id);
  
    if(index < 0) {
      return res.status(404).json({ error: "User not found" });
    }
  
    req.orderIndex = index;
    req.orderId = id;
  
    next();
  },

  logMethod(req, res, next) {
    console.log(`Method: ${req.method}, URL: ${req.originalUrl}`);
    next();
  },

  createOrder(req, res) {
    const { order, clientName, price } = req.body;
  
    if(order.length < 1 || clientName.length < 1 || price.length < 1) {
      return res.status(403).json({ message: "Fill in all fields to create the order!" })
    }
  
    const fullOrder = { id: uuidv4(), order, clientName, price, status: "Em preparação" };
  
    orders.push(fullOrder)
  
    return res.status(201).json(fullOrder)
  },

  listOrders(req, res) {
    return res.json(orders);
  },

  listOrdersById(req, res) {
    const id = req.orderId;
    const orderById = orders.find(order => order.id === id)
  
    return res.json(orderById)
  },

  updateOrder(req, res) {
    const { order, clientName, price } = req.body;
    const index = req.orderIndex;
    const id = req.orderId;
  
    const updateOrder = { id, order, clientName, price, status: "Em preparação" }
  
    orders[index] = updateOrder;
  
    return res.json(updateOrder);
  },

  updateOrderStatus(req, res) {
    const id = req.orderId;
    const index = req.orderIndex;
    const { status } = req.body;
  
    orders[index].status = status;
  
    const orderWithUpdatedStatus = orders.find(order => order.id === id)
  
    return res.json(orderWithUpdatedStatus);
  },

  deleteOrders(req, res) {
    const index = req.orderIndex;
  
    orders.splice(index, 1);
  
    return res.json({ message: "Order deleted successfully!" });
  },
}

export { ordersController }