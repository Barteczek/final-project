const express = require('express');
const router = express.Router();

const Email = require('../models/email.model');

router.post('/emails', async (req, res) => {
  try {
    const { email } = req.body;

    
    if(email){   
      const newEmail = new Email({email: email});
      await newEmail.save();
      res.json( {message: `${newEmail.email} successfuly saved`});
      
    } else {
      res.json({message: 'Please fill email field!'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
