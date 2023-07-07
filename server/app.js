const express = require('express');
const app = express();
require('./db/config')
const port = 8000;
app.get('/', (req,res) =>{
    res.send('hello world')
})
app.get('/about', (req,res) =>{
    res.send('this is about page')
})
app.get('/contact', (req,res) =>{
    res.send('this is contact page')
})
app.listen(port, () =>{
    console.log(`server is running at port ${port}`);
})