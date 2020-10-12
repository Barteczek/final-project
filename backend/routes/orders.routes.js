const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.post('/orders', async (req, res) => {
  try {
    const { name, surname, email, mobile, subtotal, cart } = req.body;
    if(name && surname && email && mobile ){
      const newOrder = new Order({name: name, surname: surname, email: email, mobile: mobile, subtotal: subtotal, cart: cart});
      await newOrder.save();
      res.json( newOrder );
    } else {
      res.json({message: 'Please fill all fields!'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
