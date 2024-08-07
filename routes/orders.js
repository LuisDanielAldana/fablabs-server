var express = require('express');
var router = express.Router();

const orderController = require('../controllers/order.controller')

router.post('/order', orderController.upload.single('file'), orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/order/:id', orderController.updateOrder);
router.put('/order/:id/changeDeleteStatus', orderController.changeDeleteStatus);

module.exports = router;
