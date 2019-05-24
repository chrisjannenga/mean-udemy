const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

// Mongo user password 

const app = express();

mongoose.connect('mongodb+srv://appUser:Qzg41Zmfksa5jtkK@alpha-d7jqe.mongodb.net/node-angular?retryWrites=true', {
    useNewUrlParser: true 
})
.then(() => {
    console.log("Connected to MongoDB Atlas")
}). catch(() => {
    console.log("Failed to connect to MongoDB Atlas")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        return res.status(200).json({
          message: 'Posts sent successfully',
          results: documents
        });
    });
    
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
      title: req.body.title,
      content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post was added successfully!',
      postId: createdPost._id
    })
  });
  console.log(post);
  
  
})

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then(() => {
        res.status(200).json({
          message: `Post with id:${req.params.id} was deleted.`
        })
    }).catch(() => {
        
    })
})

module.exports = app;
