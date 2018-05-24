// create an instance of a router
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out')
});

// auth google
router.get('/google', passport.authenticate('google', {
    // what we want to retrieve from users profile? 
    scope: ['profile']
}))

// callback route for googel to redirect to
// below, the code is recieved
// this is a repeat of above, but this time it has the code

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    res.send('you reached the callback URI')
})


module.exports = router;