const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    const result = await Product.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

// router.get('/posts/:id', async (req, res) => {
//   try {
//     const result = await Post
//       .findById(req.params.id);
//     if(!result) res.status(404).json({ post: 'Not found' });
//     else res.json(result);
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/posts/add', async (req, res) => {
//   try {
//     const { title, text, price } = req.body;
//     if(title && text && price ){
//       const newPost = new Post({title: title, text: text, price: price});
//       await newPost.save();
//       res.json( newPost );
//     } else {
//       res.json({message: 'Please fill all fields!'});
//     }
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
