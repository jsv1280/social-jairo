const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config.js')
const post = require('./components/post/network.js')

const errors = require('../network/error');


const app = express()

app.use(bodyParser.json())

// ROUTER
app.use('/api/post',post)
app.use(errors);


app.listen(config.post.port,() => {
    console.log('Servicio post escuchando', config.post.port)
});