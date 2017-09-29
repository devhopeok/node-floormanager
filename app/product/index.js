'use strict';

var express = require('express');
var controller = require('./product.controller');
var config = require('../../config');
var jwt    = require('jsonwebtoken');

var router = express.Router();

function checkAuth(req, res, next) {
	var token = req.body.token || req.query.token;
  console.log(token);
	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {

			if (err) {

      	return res.status(401).send({message: 'Authentication Failed'});
			} else {
			// if everything is good, save to request for use in other routes
				req.user = decoded;
      //  console.log(req.user);
				next();
			}
		});

	} else {
		return res.status(401).send({message: 'Authentication Failed'});
	}
}

router.get('/', checkAuth, controller.getProducts);
router.post('/', checkAuth, controller.newProduct);
router.delete('/:_id', checkAuth, controller.deleteProduct);
router.get('/:_id', checkAuth, controller.getProductById);
// router.patch('/:login', checkAuth, controller.updateAdmin);
// router.delete('/:login', checkAuth, controller.deleteAdmin);
// router.post('/:login/change-password', checkAuth, controller.changePassword);
// router.post('/login', controller.login);

module.exports = router;
