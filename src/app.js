const path = require('path')
const express = require('express')
const fetch = require('node-fetch')

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

let serport = process.env.port || 9191;

app.get('/',(req, res )=>{
    console.log('First request');
})

app.get('/orderList',(req, res)=>{
    let url = `https://services.odata.org/Northwind/Northwind.svc/Orders?$format=json`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        res.send(data);
    });
})
app.get('/order*',(req, res )=>{
    let resdata;
    console.log('First request');
    let url = `https://services.odata.org/Northwind/Northwind.svc/Orders(`+ req.query.OrderID + `)/?$format=json`;
   fetch(url)
   .then(response =>response.json())
   .then(data => {
       res.send(data);
       console.log(data);
        }
       )
   .catch(err =>{console.log(err);});
     
   
})
app.listen(serport, () => {
    console.log("Hi")
    console.log(`Server is up on port  ` + serport);
})