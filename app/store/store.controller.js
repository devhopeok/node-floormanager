
var Store = require('./store.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newStore = function(req, res) {

    if( (req.body.name == '' || req.body.name == null) || (req.user.email == '' || req.user.email == null)) {
        res.status(405).send('Missing Parameter');
    } else {
        var newStore = new Store(
        {
            email: req.user.email, // Creator email of store
            name: req.body.name,
            image: req.body.image,
        
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        
            employees: req.body.employees
        });

        checkStoreDuplication(req, function(result){
          if (result.status == 'error'){
            res.status(402).send("DB error");
            return;
          }
          else if(result.status == 'ok'){
            newStore.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    res.json('Success');
                }
            });
          }
          else{
            res.status(403).send('Store already exists');
          }
        });
    }
}

exports.getStores = function(req, res) {
    Store.find(function(err, stores) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < stores.length; i++) {
            resultList.push(stores[i]);
        }
        res.json(resultList);
    });
}

exports.deleteStore = function(req, res) {
    Store.find({_id: req.params._id}, function(err, stores) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (stores.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        stores[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

function checkStoreDuplication(req, callback){
    Store.findOne({name: req.body.name}, function(err, store) {
        if (err){
            callback({status: 'error'})
            return;
        }
        if (store){
            callback(store);
            return;
        }
        callback({status: 'ok'})
    });
}
