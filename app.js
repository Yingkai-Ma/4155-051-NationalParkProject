//require modules
const express = require('express');
const morgan = require('morgan');
const indexRoutes = require('./routes/indexRoutes');
const stateRoutes = require('./routes/stateRoutes');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose'); //user authentication
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');

mongoose.set('strictQuery', false);
//create  app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NPDatabase';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url)
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//mount middlware for password configuration
app.use(
    session({
        secret: "5k1j228mw8gr7r",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/NPDatabase' }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.user_firstName = req.session.user_firstName || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//set up routes

app.use('/', indexRoutes);
app.use('/states', stateRoutes);
app.use('/users', userRoutes);

app.use((req, res, next)=>{
    let err = new Error('The server cannot find ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});