'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')
const ValidationContract = require('../validators/fluent-validator')

exports.get = (req, res, next) => {
    Product
        .find({
            //"active":true
        }, 'title price slug tags') //filtro dos campos a serem carregados do BD
        .then( ret => {
            res.status(200).send(ret)
        })
        .catch( e => {
            res.status(400).send(e)
        })
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
        slug: req.params.slug,
        active: true
    }, "title description price slug tags")
    .then( ret => {
        res.status(200).send(ret)
    })
    .catch( e => {
        res.status(400).send(e)
    })
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then( ret => {
            res.status(200).send(ret)
        })
        .catch( e => {
            res.status(400).send(e)
        })
}

exports.getByTag = (req, res, next) => {
    Product
        .find({ 
            tags: req.params.tag,
            active: true
        })
        .then( ret => {
            res.status(200).send(ret)
        })
        .catch( e => {
            res.status(400).send(e)
        })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    //Execução de validação
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end()
        return
    }

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
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    //Execução de validação
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end()
        return
    }

    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                slug: req.body.slug
            }
        })
        .then( ret => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            })
        })
        .catch( e => {
            res.status(400).send({
                message: 'Erro ao atualizar o produto!',
                error: e   
            })
        })
}

exports.delete = (req,res,next) =>{
    Product
        .findByIdAndRemove(req.body.id)
        .then( ret => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            })
        })
        .catch( e => {
            res.status(400).send({
                message: "Não foi possível excluir o produto.",
                error: e
            })
        })
}