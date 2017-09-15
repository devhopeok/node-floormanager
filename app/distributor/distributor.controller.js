
var Distributor = require('./distributor.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newDistributor = function(req, res) {

  if( (req.body.name == '' || req.body.name == null) || (req.user.email == '' || req.user.email == null)
   || (req.body.password == '' || req.body.password == null) || (req.body.distributor_email == '' || req.body.distributor_email == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        var newDistributor = new Distributor(
        {
          email: req.user.email,
          name: req.body.name,
          phone: req.body.phone,
          distributor_email: req.body.distributor_email,
          password: req.body.password,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          managed_by_store: req.body.managed_by_store,
          managed_by_manufacturer: req.body.managed_by_manufacturer
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
