const express = require('express');

require("dotenv").config();

const db = require("./Connection/connection")

// initialize
const app = express();
const morgan = require("morgan")
const port = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require("cors");

// route import
const UserRoute = require("./Route/userRoute");
const CategoryRoute = require('./Route/categoryRoute');
const ProductRoute = require('./Route/productRoute');
const OrderRoute = require('./Route/orderRoute');

// Server uses
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', UserRoute);
app.use('/api',CategoryRoute);
app.use('/api',ProductRoute);
app.use('/api',OrderRoute);

app.use("/public/uploads", express.static(__dirname + '/public/uploads'))

// Server start index
app.get('/', (req,res) => {
    res.send("This is an ecommerce server")
})

app.listen(port, ()=> {
    console.log(`server get started at ${port}`)
})