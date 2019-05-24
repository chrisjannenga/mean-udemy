const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: '01', title: 'First Post from the server', content: 'This is coming from the server' },
        { id: '02', title: 'Second post from the server', content: 'This is coming from the server, also.' }
    ]
    return res.status(200).json({
        message: 'Posts sent successfully',
        results: posts
    });
})

module.exports = app;
