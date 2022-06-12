const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', function(req, res, next) {
    let all = UserService.getAll();
    res.send(`${all.reduce((res, el) => res + el.id + '\n', '')}`);
});

router.post('/', function(req, res, next) {
//    email, password, firstName, lastName, phoneNumber
    res.send(UserService.create(req.body).id);
});

router.get('/:id', function(req, res, next) {
    let user = UserService.getById(req.params.id);
    if (user) {
        res.send(`Hi, ${user.id}`);
    }
});

router.put('/:id', function(req, res, next) {
    let updated = UserService.update(req.params.id, req.body);
    if (updated) {
        res.send(`Updated ${updated.id}`);
    }
});

router.delete('/:id', function(req, res, next) {
    let deleted = UserService.delete(req.params.id);
    console.log(`deleted: `, deleted);
    if (deleted.length) {
        res.send(`Deleted ${deleted[0].id}`);
    }
});

module.exports = router;