const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {

});

router.put('/:id', function(req, res, next) {

});

router.delete('/:id', function(req, res, next) {

});

module.exports = router;