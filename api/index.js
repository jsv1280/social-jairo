const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config.js')
const user = require('./components/user/network.js')
const auth = require('./components/auth/network.js')

const errors = require('../network/error');


const app = express()

app.use(bodyParser.json())

// ROUTER
app.use('/api/user',user)
app.use('/api/auth',auth)
app.use(errors);


app.listen(config.api.port,() => {
    console.log('Escuchando en el puerto', config.api.port)
});