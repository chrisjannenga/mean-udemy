const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


const app = express();

mongoose.connect('mongodb+srv://appUser:Qzg41Zmfksa5jtkK@alpha-d7jqe.mongodb.net/node-angular?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.log("Connected to Atlas")
}). catch(() => {
    console.log("Failed to connect to MongoDB Atlas")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
