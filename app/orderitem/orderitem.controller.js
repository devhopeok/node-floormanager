
var Orderitem = require('./orderitem.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newOrderitem = function(req, res) {

  if( (req.body.order_id == '' || req.body.order_id == null)) {
        res.status(405).send('Missing Parameter');
    } else {

      for (var i=0; i<req.body.order_array.length; i++){
          var orderItem = req.body.order_array[i];
          if ((orderItem.customer_id == '' || orderItem.customer_id == null) || (orderItem.product_id == '' || orderItem.product_id == null)){

          }
          else{
            var newOrderitem = new Orderitem(
            {
              order_id: req.body.order_id,
              customer_id: orderItem.customer_id,
              product_id: orderItem.product_id,
              amount: orderItem.amount,
              price: orderItem.price
            });

            newOrderitem.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    res.json('Success');
                }
            });
          }
      }
    }
}

exports.getOrderitems = function(req, res) {
    var order_id = req.body.order_id || req.query.order_id;
    Orderitem.find({order_id: order_id}, function(err, orderitems) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < orderitems.length; i++) {
            resultList.push(orderitems[i]);
        }
        res.json(resultList);
    });
}

exports.deleteOrderitem = function(req, res) {
    Orderitem.find({order_id: req.params._id}, function(err, orderitems) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (orderitems.length == 0){
            res.status(404).send('Invalid id')
            return;
        }

        for (var i=0; i<orderitems.length; i++){
          orderitems[i].remove(function(err) {
              if (err){
                  res.status(402).send(err);
                  return;
              }
          });
        }
        res.json('Success');
    });
}
