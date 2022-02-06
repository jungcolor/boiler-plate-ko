const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dongwoo:1q2w3e4r@boilerplate.c1lu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world!~~~ 안녕하세요~!'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));