const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
//tell that we want to use googlestrategy
//two parameters - strategy // callback function
passport.use(
    new GoogleStrategy({
    // options for the strategy - from console.developers.google.com:  
    // how to store? 
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, () => {
    // passport callback function
    })
)