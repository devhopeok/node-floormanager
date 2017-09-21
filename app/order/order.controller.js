
var Order = require('./order.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newOrder = function(req, res) {

  if( (req.body.customer_id == '' || req.body.customer_id == null) || (req.user.email == '' || req.user.email == null)
   || (req.body.product_id == '' || req.body.product_id == null)) {
        res.status(405).send('Missing Parameter');
    } else {
        var newOrder = new Order(
        {
          email: req.user.email,
          customer_id: req.body.customer_id,
          product_id: req.body.product_id,
          date: req.body.date,
          due_date: req.body.due_date,
          discount: req.body.discount,
          sales_tax: req.body.sales_tax,
          shipping_fee: req.body.shipping_fee,
          message: req.body.message,
          memo: req.body.memo
        });

        newOrder.save(function(err, data) {
            if (err) {
                res.status(402).send(err);
                return;
            } else {
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
        orders[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
