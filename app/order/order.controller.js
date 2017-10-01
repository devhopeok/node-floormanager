
var Order = require('./order.model.js');
var Orderitem = require('../orderitem/orderitem.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newOrder = function(req, res) {

  if( (req.body.client_id == '' || req.body.client_id == null) || (req.user.email == '' || req.user.email == null)) {
        res.status(405).send('Missing Parameter');
    } else {
        var newOrder = new Order(
        {
          email: req.user.email,
          client_id: req.body.client_id,
          date: req.body.date,
          due_date: req.body.due_date,
          discount: req.body.discount,
          sales_tax: req.body.sales_tax,
          shipping_fee: req.body.shipping_fee,
          message: req.body.message,
          memo: req.body.memo,
          total_price: req.body.total_price,
          step: 0
        });

        newOrder.save(function(err, data) {
            if (err) {
                res.status(402).send(err);
                return;
            } else {
                for (var i=0; i<req.body.products.length; i++){
                    var orderItem = req.body.products[i];
                    if ((orderItem.product_id == '' || orderItem.product_id == null)){
                        res.status(405).send('Missing Parameter');
                    }
                    else{
                      var newOrderitem = new Orderitem(
                      {
                        order_id: data._id,
                        product_id: orderItem.product_id,
                        product_name: orderItem.product_name,
                        product_image: orderItem.product_image,
                        count: orderItem.count,
                        cost: orderItem.cost,
                        total: orderItem.total
                      });
                      newOrderitem.save(function(err1, data1) {
                          if (err1) {
                              res.status(402).send(err1);
                              return;
                          } else {
                          }
                      });
                    }
                }
                res.json('Success');
            }
        });
    }
}

exports.getOrders = function(req, res) {
    Order.find({email: req.user.email}, function(err, orders) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < orders.length; i++) {
              resultList.push(orders[i]);
        }
        res.json(resultList);
    });
}

exports.getOrderById = function(req, res){

    Orderitem.find({order_id: req.params._id}, function(err, products) {
      console.log(products);
        if (err) return;
        var resultList = [];
        for(var i = 0; i < products.length; i++) {
              resultList.push(products[i]);
        }
        res.json(resultList);
    });
}

exports.updateOrder = function(req, res) {
    Order.find({_id: req.params._id}, function(err, orders) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (orders.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        orders[0].update({$set: {
            step: req.body.step,
            attach_image: req.body.attach_image,
            company_name: req.body.install_company.name,
            company_tech_name: req.body.install_company.tech_name,
            company_tech_phone: req.body.install_company.tech_phone,
            company_date: req.body.install_company.date,
            company_time: req.body.install_company.time
        }}, function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

exports.deleteOrder = function(req, res) {
    Order.find({_id: req.params._id}, function(err, orders) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (orders.length == 0){
            res.status(404).send('Invalid id')
            return;
        }

        Orderitem.find({order_id: req.params._id}, function(err1, products) {
            if (products.length == 0){
                return;
            }
            for (var i=0; i<products.length; i++){ 
              products[i].remove(); 
            }
        });

        orders[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
