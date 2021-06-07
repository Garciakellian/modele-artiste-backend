const express = require('express');
const router = express.Router();

const orderCtrl = require('../controllers/order');

router.post('/order', orderCtrl.order)
router.get('/success', orderCtrl.success)
router.get('/cancel', orderCtrl.cancel)


module.exports = router;