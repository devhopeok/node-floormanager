
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
          cost: req.body.cost,
          unit: req.body.unit,
          mark_up_percent: req.body.mark_up_percent,
          length: req.body.length,
          width: req.body.width,
          area: req.body.area,
          min_shipping_cost: req.body.min_shipping_cost,
          flat_fee: req.body.flat_fee,
          price: req.body.price,
          image: req.body.image,
          sku_num: req.body.sku_num,
          client_ids: req.body.client_ids,
          color: req.body.color,
          protection: req.body.protection,
          fiber: req.body.fiber,
          pattern: req.body.pattern
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

exports.updateProduct = function(req, res) {
    Product.find({_id: req.params._id}, function(err, products) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (products.length == 0){
            res.status(404).send('Invalid id')
            return;
        }

        if (req.body.name == undefined){
          req.body.name = products[0].name;
        }

        if (req.body.distributor_email == undefined){
          req.body.distributor_email = products[0].distributor_email;
        }

        if (req.body.distributor_name == undefined){
          req.body.distributor_name = products[0].distributor_name;
        }

        if (req.body.material == undefined){
          req.body.material = products[0].material;
        }

        if (req.body.project == undefined){
          req.body.project = products[0].project;
        }

        if (req.body.available == undefined){
          req.body.available = products[0].available;
        }

        if (req.body.cost == undefined){
          req.body.cost = products[0].cost;
        }

        if (req.body.unit == undefined){
          req.body.unit = products[0].unit;
        }

        if (req.body.mark_up_percent == undefined){
          req.body.mark_up_percent = products[0].mark_up_percent;
        }

        if (req.body.length == undefined){
          req.body.length = products[0].length;
        }

        if (req.body.width == undefined){
          req.body.width = products[0].width;
        }

        if (req.body.area == undefined){
          req.body.area = products[0].area;
        }

        if (req.body.min_shipping_cost == undefined){
          req.body.min_shipping_cost = products[0].min_shipping_cost;
        }

        if (req.body.flat_fee == undefined){
          req.body.flat_fee = products[0].flat_fee;
        }

        if (req.body.price == undefined){
          req.body.price = products[0].price;
        }

        if (req.body.image == undefined){
          req.body.image = products[0].image;
        }

        if (req.body.sku_num == undefined){
          req.body.sku_num = products[0].sku_num;
        }

        if (req.body.client_ids == undefined){
          req.body.client_ids = products[0].client_ids;
        }

        if (req.body.color == undefined){
          req.body.color = products[0].color;
        }

        if (req.body.pattern == undefined){
          req.body.pattern = products[0].pattern;
        }

        if (req.body.fiber == undefined){
          req.body.fiber = products[0].fiber;
        }

        if (req.body.protection == undefined){
          req.body.protection = products[0].protection;
        }

        products[0].update({$set: {
            name: req.body.name,
            distributor_email: req.body.distributor_email,
            distributor_name: req.body.distributor_name,
            material: req.body.material,
            project: req.body.project,
            available: req.body.available,
            cost: req.body.cost,
            unit: req.body.unit,
            mark_up_percent: req.body.mark_up_percent,
            length: req.body.length,
            width: req.body.width,
            area: req.body.area,
            min_shipping_cost: req.body.min_shipping_cost,
            flat_fee: req.body.flat_fee,
            price: req.body.price,
            image: req.body.image,
            sku_num: req.body.sku_num,
            client_ids: req.body.client_ids,
            color: req.body.color,
            protection: req.body.protection,
            fiber: req.body.fiber,
            pattern: req.body.pattern
        }}, function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
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
