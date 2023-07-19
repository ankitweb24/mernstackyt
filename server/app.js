const express = require('express');
const app = express();
const cors = require('cors');
require('./db/config');

const usercollection = require('./model/userSchema');
const port = 8000;

app.use(express.json())

app.use(cors())


app.use(require('./route/router'))


app.listen(port, () =>{
    console.log(`server is running at port ${port}`);
})