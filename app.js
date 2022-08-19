const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.router');
const connectDB = require('./config/db.config')

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

connectDB().then(() => {
    console.log('database connected');
})



app.listen(PORT,()=>{
    console.log(`server is listing on ${PORT}`)
    }
)
module.exports = app;
