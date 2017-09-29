
var Product = require('./product.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newProduct = function(req, res) {

    if( (req.body.name == '' || req.body.name == null) || (req.user.email == '' || req.user.email == null)) {
        res.status(405).send('Missing Parameter');
    } else {
        var newProduct = new Product(
        {
          creator_email: req.user.email, // Creator email of product
          name: req.body.name,
          distributor_email: req.body.distributor_email,
          distributor_name: req.body.distributor_name,
          material: req.body.material,
          project: req.body.project,
          available: req.body.available,
          cost_per_unit: req.body.cost,
          unit: req.body.unit,
          mark_up_percent: req.body.mark_up_percent,
          length: req.body.length,
          width: req.body.width,
          area: req.body.area,
          min_shipping_cost: req.body.min_shipping_cost,
          flat_fee: req.body.flat_fee,
          price: req.body.price,
          image: req.body.image
        });

        checkProductDuplication(req, function(result){
          if (result.status == 'error'){
            res.status(402).send("DB error");
            return;
          }
          else if(result.status == 'ok'){
            newProduct.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    res.json('Success');
                }
            });
          }
          else{
            res.status(403).send('Product already exists');
          }
        });
    }
}

exports.getProducts = function(req, res) {
    Product.find(function(err, products) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < products.length; i++) {
            resultList.push(products[i]);
        }
        res.json(resultList);
    });
}

exports.getProductById = function(req, res) {
    Product.findOne({_id: req.params._id}, function(err, product) {
        if (err) return;
        res.json(product);
    });
}

exports.deleteProduct = function(req, res) {
    Product.find({_id: req.params._id}, function(err, products) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (products.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        products[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

function checkProductDuplication(req, callback){
    Product.findOne({name: req.body.name}, function(err, product) {
        if (err){
            callback({status: 'error'})
            return;
        }
        if (product){
            callback(product);
            return;
        }
        callback({status: 'ok'})
    });
}
