
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
          step: 0, 
          tracking_no: req.body.tracking_no,
          padding: req.body.padding,
          track_script: req.body.track_script,
          glue: req.body.glue,
          labor: req.body.labor,
          trans_script: req.body.trans_script,
          ship_info: req.body.ship_info
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
                        total: orderItem.total,
                        dis_id: orderItem.dis_id,
                        dis_phone: orderItem.dis_phone,
                        dis_image: orderItem.dis_image
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
    Order.find({}, function(err, orders) {
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

        console.log(req.body.step);
        
        if (req.body.step == undefined){
          req.body.step = orders[0].step;
        }

        if (req.body.attach_image == undefined){
          req.body.attach_image = orders[0].attach_image;
        }

        if (req.body.install_company == undefined){
          req.body.install_company = orders[0].install_company;
        }

        if (req.body.tracking_no == undefined){
          req.body.tracking_no = orders[0].tracking_no;
        }

        if (req.body.padding == undefined){
          req.body.padding = orders[0].padding;
        }

        if (req.body.track_script == undefined){
          req.body.track_script = orders[0].track_script;
        }

        if (req.body.glue == undefined){
          req.body.glue = orders[0].glue;
        }

        if (req.body.labor == undefined){
          req.body.labor = orders[0].labor;
        }

        if (req.body.trans_script == undefined){
          req.body.trans_script = orders[0].trans_script;
        }

        if (req.body.ship_info == undefined){
          req.body.ship_info = orders[0].ship_info;
        }

        orders[0].update({$set: {
            attach_image: req.body.attach_image,
            install_company: req.body.install_company,
            step: req.body.step,
            tracking_no: req.body.tracking_no,
            padding: req.body.padding,
            track_script: req.body.track_script,
            glue: req.body.glue,
            labor: req.body.labor,
            trans_script: req.body.trans_script,
            ship_info: req.body.ship_info
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
