const express = require('express');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,"./db.json")

const app = express();

app.get("/products",(req,res)=>{
    const prod = fs.readFile(filePath,'utf-8')
    res.json(prod)
})

app.listen(3000)