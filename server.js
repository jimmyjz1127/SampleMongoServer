//check if we are running the production environment or not before requiring dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//Routes - We can name our custom routers anything we want in this server.js file
const indexRouter = require('./routes/index.js'); 

//set view engine using ejs 
app.set('view engine', 'ejs');

//set where our views are coming from (views directory)
app.set('views', __dirname + '/views');

//hookup express-layouts : every single file will be put into layout-file so we don't have to duplicate common html code
app.set('layout', 'layouts/layout');

//tell express to use expressLayouts 
app.use(expressLayouts);

//tell express where our public files will be (such as index file etc.)
app.use(express.static('public'));


//--------------------------Set Up Database --------------------------
//import mongoose as variable
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { 
    useNewURLParser:true});

//error logging
const db = mongoose.connection;
db.on('error', error => console.error(error))

//log when database is connected
db.once('open', () => console.log('Connected to Mongoose'))

//--------------------------------------------------------------------


//--------------------------Set Up Routes-----------------------------
//tell our server to use our custom indexRouter for the root URL 
app.use('/', indexRouter);


//--------------------------------------------------------------------

//tells server to pull a port from enviroment variables and default to 3000
app.listen(process.env.PORT || 3000);