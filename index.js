// require the libeary express
const express = require('express');
// call the express
const app = express();
// defining a port
const port = 8000;
//REQUIRE PATH
const path = require('path');


const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
// REQUIRE DATABASE
const db = require('./configs/mongoose');
// REQUIRE EXPRESS-SESSION
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// ACCESS THE STATIC FILES
app.use(express.static('assets'));
// BODY PARSER CHANGE THE FORM THE DATA TO JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USE EXPRESS SESSION TO STORE
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// set up the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// REQUIRE THE ROUTES
app.use('/',require('./routes'));
// FIRE UP THE SERVER
app.listen(port,function(err){

    if(err){console.log('server connecting error')};
    console.log(`server is connected sucessfully on the port of ${port}`);
})