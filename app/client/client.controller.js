
var Client = require('./client.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newClient = function(req, res) {

    if( (req.user.email == '' || req.user.email == null)
      || (req.body.client_email == '' || req.body.client_email == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        var newClient = new Client(
        {
          email: req.user.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone,
          client_email: req.body.client_email,
          address: req.body.address,
          zipcode: req.body.zipcode,
          projects: req.body.projects,
          products: req.body.products,
          city: req.body.city,
          state: req.body.state
        });

        checkClientDuplication(req, function(result){
          if (result.status == 'error'){
            res.status(402).send("DB error");
            return;
          }
          else if(result.status == 'ok'){
            newClient.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    res.json('Success');
                }
            });
          }
          else{
            res.status(403).send('Client already exists');
          }
        });
    }
}

exports.getClients = function(req, res) {
    Client.find({}, function(err, clients) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < clients.length; i++) {
            resultList.push(clients[i]);
        }
        res.json(resultList);
    });
}

exports.updateClient = function(req, res) {
    Client.find({_id: req.params._id}, function(err, products) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (products.length == 0){
            res.status(404).send('Invalid id')
            return;
        }

        if (req.body.first_name == undefined){
          req.body.first_name = products[0].first_name;
        }

        if (req.body.last_name == undefined){
          req.body.last_name = products[0].last_name;
        }

        if (req.body.phone == undefined){
          req.body.phone = products[0].phone;
        }

        if (req.body.client_email == undefined){
          req.body.client_email = products[0].client_email;
        }

        if (req.body.address == undefined){
          req.body.address = products[0].address;
        }

        if (req.body.zipcode == undefined){
          req.body.zipcode = products[0].zipcode;
        }

        if (req.body.projects == undefined){
          req.body.projects = products[0].projects;
        }

        if (req.body.products == undefined){
          req.body.products = products[0].products;
        }

        if (req.body.city == undefined){
          req.body.city = products[0].city;
        }

        if (req.body.state == undefined){
          req.body.state = products[0].state;
        }

        products[0].update({$set: {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              client_email: req.body.client_email,
              address: req.body.address,
              zipcode: req.body.zipcode,
              projects: req.body.projects,
              products: req.body.products,
              city: req.body.city,
              state: req.body.state
        }}, function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

exports.deleteClient = function(req, res) {
    Client.find({_id: req.params._id}, function(err, clients) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (clients.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        clients[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

function checkClientDuplication(req, callback){
    Client.findOne({email: req.user.email, client_email: req.body.client_email}, function(err, user) {
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
