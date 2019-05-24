const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});



app.get('/api/posts', (req, res, next) => {
    const posts = [
        { id: '01', title: 'First Post from the server', content: 'This is coming from the server' },
        { id: '02', title: 'Second post from the server', content: 'This is coming from the server, also.' }
    ]
    return res.status(200).json({
        message: 'Posts sent successfully',
        results: posts
    });
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post was added successfully!'
  })
})

module.exports = app;
