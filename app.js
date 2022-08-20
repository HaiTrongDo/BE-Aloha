const express = require('express');
const dotenv = require("dotenv");
const path = require('path');
const cors = require('cors')
const auth = require('./Routes/auth.router');
const connectDB = require('./config/db.config')
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 8080
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.get('/', function(req, res) {
    res.send('Page under construction.');
});



app.use('/auth', auth);
// app.use('/api', passport.authenticate('jwt', { session: false}), book);

connectDB().then(() => {
    console.log('database connected');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(PORT,()=>{
    console.log(`server is listing on ${PORT}`)
    }
)
module.exports = app;
