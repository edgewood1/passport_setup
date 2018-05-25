const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user_models.js');

// step 2
passport.serializeUser((user, done)=> {
    // this takes the done method from below. 
    // done -  get mongodb id - passed on to done
    // null takes error
    done(null, user.id)
})

//step 3
passport.deserializeUser((id, done)=> {
    // this takes the id from the browser
    // 
    User.findById(id).then((user) => {
        done(null, user.id)
    })
})

// step one
//tell that we want to use googlestrategy
//two parameters - strategy // callback function
passport.use(
    new GoogleStrategy({
    // options for the strategy - from console.developers.google.com:  
    // how to store? 
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    // accessToken - from google, we can use it later to check their profile
    // refreshToken - refreshes access because it expires
    // profile - we requested this - exchanged for code
    // done - says we're done
        
    // check if user already exists in db

        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                // already have user
                console.log('user is: ', currentUser)
                done(null, currentUser);
            } else {
                // if not create user: 

                new User ({
                    username: profile.displayName, 
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser)
                    done(null, newUser);
                })

            }
        })


  
    })
)