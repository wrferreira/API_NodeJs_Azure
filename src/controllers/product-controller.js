'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product
        .save()
        .then( ret => {
            console.log(ret)
            res.status(200).send({ message: 'Produto cadastrado com sucesso!'})
        })
        .catch( e => {
            console.log(e)
            res.status(400).send({ message: 'Falha ao cadastro o produto', data: e})
        })
}

exports.put = (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        id: id,
        data: req.body
    })
}

exports.delete = (req,res,next) =>{
    res.status(200).send(req.body)
}