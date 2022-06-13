const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', function (req, res, next) {
    let all = UserService.getAll();
    res.send(`${all.reduce((res, el) => res + el.id + '\n', '')}`);
});

router.post('/', createUserValid, function (req, res, next) {
//    email, password, firstName, lastName, phoneNumber
    let created = UserService.create(req.body);
    try {
        if (created) {
            res.data = created;
            next();
        } else {
            throw Error("Unable to create user");
        }
    } catch (err) {
        // next(err);
        res.err = err;
        next();
    }

}, responseMiddleware);

router.get('/:id', function (req, res, next) {
    let user = UserService.getById(req.params.id);
    if (user) {
        res.send(`Hi, ${user.id}`);
    }
});

router.put('/:id', updateUserValid, function (req, res, next) {
    let updated = UserService.update(req.params.id, req.body);
    try {
        if (updated) {
            res.data = updated;
            next();
        } else {
            throw Error("Unable to update user");
        }
    } catch (err) {
        // next(err);
        res.err = err;
        next();
    }
}, responseMiddleware);

router.delete('/:id', function (req, res, next) {
    let deleted = UserService.delete(req.params.id);
    console.log(`deleted: `, deleted);
    if (deleted.length) {
        res.send(`Deleted ${deleted[0].id}`);
    }
});

module.exports = router;