const express = require('express');

const router = express();

router.get('/', (req,res) =>{
    res.send('hello world')
})
router.get('/about', (req,res) =>{
    res.send('this is about page')
})
router.get('/contact', (req,res) =>{
    res.send('this is contact page')
})

module.exports = router;