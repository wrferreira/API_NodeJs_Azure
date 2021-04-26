'use strict'

const express = require('express')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser') // ==> deprecated

const app = express()
const router = express.Router()

//Conecta ao Banco
mongoose.connect('mongodb+srv://engturan:macaco22@cluster0.gueuj.mongodb.net/node-store')

//Carregando os Models
const Product = require('./models/product')

//Carrega as Rotas
const indexRoute = require('./routes/index')
const productRoute = require('./routes/product')

app.use(express.json()) // ==> bodyparse: deprecated 
app.use(express.urlencoded({ extended: false })) // ==> bodyparse: deprecated



app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app;