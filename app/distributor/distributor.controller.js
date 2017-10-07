
var Distributor = require('./distributor.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newDistributor = function(req, res) {

  if( (req.body.name == '' || req.body.name == null) || (req.user.email == '' || req.user.email == null)
    || (req.body.distributor_email == '' || req.body.distributor_email == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        var newDistributor = new Distributor(
        {
          email: req.user.email,
          name: req.body.name,
          phone: req.body.phone,
          distributor_email: req.body.distributor_email,
          fax: req.body.fax,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          sales_name: req.body.sales_name,
          sales_phone: req.body.sales_phone,
          sales_email: req.body.sales_email,
          image: req.body.image
        });

        checkDistributorDuplication(req, function(result){
          if (result.status == 'error'){
            res.status(402).send("DB error");
            return;
          }
          else if(result.status == 'ok'){
            newDistributor.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    res.json('Success');
                }
            });
          }
          else{
            res.status(403).send('Distributor already exists');
          }
        });
    }
}

exports.getDistributors = function(req, res) {
    Distributor.find({email: req.user.email}, function(err, distributors) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < distributors.length; i++) {
            resultList.push(distributors[i]);
        }
        res.json(resultList);
    });
}

exports.updateDistributor = function(req, res) {
    Distributor.find({_id: req.params._id}, function(err, products) {
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

        if (req.body.phone == undefined){
          req.body.phone = products[0].phone;
        }

        if (req.body.distributor_email == undefined){
          req.body.distributor_email = products[0].distributor_email;
        }

        if (req.body.fax == undefined){
          req.body.fax = products[0].fax;
        }

        if (req.body.address == undefined){
          req.body.address = products[0].address;
        }

        if (req.body.city == undefined){
          req.body.city = products[0].city;
        }

        if (req.body.state == undefined){
          req.body.state = products[0].state;
        }

        if (req.body.zip == undefined){
          req.body.zip = products[0].zip;
        }

        if (req.body.sales_name == undefined){
          req.body.sales_name = products[0].sales_name;
        }
        if (req.body.sales_phone == undefined){
          req.body.sales_phone = products[0].sales_phone;
        }
        if (req.body.sales_email == undefined){
          req.body.sales_email = products[0].sales_email;
        }

        if (req.body.image == undefined){
          req.body.image = products[0].image;
        }        

        products[0].update({$set: {
              name: req.body.name,
              phone: req.body.phone,
              distributor_email: req.body.distributor_email,
              fax: req.body.fax,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              sales_name: req.body.sales_name,
              sales_phone: req.body.sales_phone,
              sales_email: req.body.sales_email,
              image: req.body.image
        }}, function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

exports.deleteDistributor = function(req, res) {
    Distributor.find({_id: req.params._id}, function(err, distributors) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (distributors.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        distributors[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

function checkDistributorDuplication(req, callback){
    Distributor.findOne({email: req.user.email, distributor_email: req.body.distributor_email}, function(err, user) {
        if (err){
            callback({status: 'error'})
            return;
        }
        if (user){
            callback(user);
            return;
        }
        callback({status: 'ok'})
    });
}
