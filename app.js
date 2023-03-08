const express = require('express');
const uuid = require('uuid');

const app = express();
const port = 3000;
app.use(express.json());

const orders = [];

const checkUserId = (req, res, next) => {
  const { id } = req.params;

  const index = orders.findIndex(order => order.id === id);

  if(index < 0) {
    return res.status(404).json({ error: "User not found" });
  }

  req.orderIndex = index;
  req.orderId = id;

  next();
}

const logMethod = (req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.originalUrl}`);
  next();
}

app.post('/order', logMethod, (req, res) => {
  const { order, clientName, price } = req.body;

  const fullOrder = { id: uuid.v4(), order, clientName, price, status: "Em preparação" };

  orders.push(fullOrder)

  res.status(201).json(fullOrder)
})

app.get('/order', logMethod, (req, res) => {
  res.json(orders);
})

app.get('/order/:id', checkUserId, logMethod, (req, res) => {
  const id = req.orderId;
  const orderById = orders.find(order => order.id === id)

  res.json(orderById)
})

app.put('/order/:id', checkUserId, logMethod, (req, res) => {
  const { order, clientName, price } = req.body;
  const index = req.orderIndex;
  const id = req.orderId;

  const updateOrder = { id, order, clientName, price, status: "Em preparação" }

  orders[index] = updateOrder;

  res.json(updateOrder)
})

app.patch('/order/:id', checkUserId, logMethod, (req, res) => {
  const id = req.orderId;
  const index = req.orderIndex;
  const { status } = req.body;

  orders[index].status = status;

  const orderWithUpdatedStatus = orders.find(order => order.id === id)

  res.json(orderWithUpdatedStatus);
})

app.delete('/order/:id', logMethod, checkUserId, logMethod, (req, res) => {
  const index = req.orderIndex;

  orders.splice(index, 1);

  res.status(204).json()
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})