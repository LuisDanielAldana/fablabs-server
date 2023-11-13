const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const config = require ('./config').configuration
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const equipmentRouter = require('./routes/equipment');
const serviceRouter = require('./routes/services');
const homeRouter = require('./routes/home');

const mongoose = require("mongoose");

const mongoURI = process.env.DATABASE_URL

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

mongoose.connection.on('open',function(){
    console.log("Database connection")
});



const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public', 'admin-panel')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/equipment', equipmentRouter);
app.use('/services', serviceRouter);
app.use('/home', homeRouter)

module.exports = app;
