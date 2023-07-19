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

router.post("/signup", async (req, res) => {
  const { username, email, phone, password, cpassword } = req.body;

  if ((!username, !email, !phone, !password, !cpassword)) {
    return res.json({ error: "plz fill fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const userExit = await userCollection.findOne({ email: email });
    if (userExit) {
      return res.json({ error: "email already exits" });
    } else if (password !== cpassword) {
      return res.json({ error: "password are not matching" });
    } else {
      const user = new userCollection({
        username,
        email,
        phone,
        password: hashedPassword,
        cpassword: hashedPassword,
      });
      const userData = await user.save();

      if (userData) {
        res.status(201).json({ message: "data saved" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});



router.post('/login', async (req,res)=>{
  console.log(req.body);

  const {email, password} = req.body;

  if(!email || !password){
    res.json({error : "plz fill fields"})
  }
  const loginData = await userCollection.findOne({email : email});

  if(loginData){
    const passwordMatch= await bcrypt.compare(password,loginData.password);

    if(passwordMatch){
      res.json({message : "login success"})
    }else{
      res.json({message : "invalid password"})
    }

  }else{
    res.json({error : "invalid email"})
  }
})

module.exports = router;
