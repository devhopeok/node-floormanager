
var Client = require('./client.model.js');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newClient = function(req, res) {

    if( (req.body.name == '' || req.body.name == null) || (req.user.email == '' || req.user.email == null)
     || (req.body.password == '' || req.body.password == null) || (req.body.client_email == '' || req.body.client_email == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        var newClient = new Client(
        {
          email: req.user.email,
          name: req.body.name,
          phone: req.body.phone,
          client_email: req.body.client_email,
          password: req.body.password,
          address: req.body.address,
          projects: req.body.projects
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
    Client.find({email: req.user.email}, function(err, clients) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < clients.length; i++) {
            resultList.push(clients[i]);
        }
        res.json(resultList);
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
