//require modules
const express = require('express');
const morgan = require('morgan');
const indexRoutes = require('./routes/indexRoutes');
const stateRoutes = require('./routes/stateRoutes');
const methodOverride = require('method-override');
//create  app
const app = express();



//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//moutn middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.use('/', indexRoutes);
app.use('/states', stateRoutes);


//start the server
app.listen(port, host, () => {
    console.log('The server is runing no', port);
});