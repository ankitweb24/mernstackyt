const express = require('express');
const router = express.Router();
const userCollection = require('../model/userSchema');
const bcrypt = require('bcryptjs');


const saltRound = 12;

router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/about', (req, res) => {
  res.send('this is the about page');
});

router.get('/contact', (req, res) => {
  res.send('this is the contact page');
});

router.post('/signup', async (req, res) => {
  const {username, email, phone, password, cpassword } = req.body;

const passwordHash = await bcrypt.hash(password, saltRound);



  if (!username || !email || !phone || !password || !cpassword) {
    return res.json({ error: 'Please fill all field' });
  }

  try {
    const emailExists = await userCollection.findOne({ email : email});

    if (emailExists) {
      return res.json({ error: 'Email already exists' });
    } else if (password !== cpassword) {
      return res.json({ error: 'Passwords do not match' });
    } else {
      const data = new userCollection({username, email, phone, password :  passwordHash, cpassword :  passwordHash });

      const userData = await data.save();

      if (userData) {
        return res.json({ message: 'Data saved' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
