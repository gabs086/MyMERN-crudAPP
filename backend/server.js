const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import ENV variable for .env file
require('dotenv').config();

//INIT express server
const app = express();
const port = process.env.PORT || 5000;

//INIT cors Middleware
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});

//Check if the connection has been established
const connection = mongoose.connection;
connection.once('open', _ => {
    console.log('MongoDB connected');
});

//getting the routes
const InfoRouter = require('./routes/info');

app.use('/info', InfoRouter);

//INIT the server on port 5000
app.listen(port, _ => {
    console.log(`Server is running in port: ${port}`)
})



