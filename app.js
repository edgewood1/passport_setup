const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// view engine set up
app.set('view engine', 'ejs')

//after serializiation, this will encrypt cookie with expiration of one day and send to browser
app.use(cookieSession({
    // max age is 24 hours
    maxAge: 24 * 60 * 60 * 1000, 
    keys: [keys.session.cookieKey]
}))

// initialize passport to use our cookies 
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// setup routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3001, () => {
    console.log('app now listening on 3001')
});