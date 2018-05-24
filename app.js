const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


const app = express();

// view engine set up
app.set('view engine', 'ejs')

// setup routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('app now listening on 300')
});