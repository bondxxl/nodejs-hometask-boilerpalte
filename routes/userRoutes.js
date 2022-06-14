const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')

    const status = err.status || 400
    res.status(status);
    res.err = err;
    next();
}

router.get('/', function (req, res, next) {
    const all = UserService.getAll();
    try {
        if (all) {
            res.data = all;
            next();
        } else {
            throw Error("Unable to get users");
        }
    } catch (err) {
        err.status = 404;
        next(err);
    }
}, errorResponder, responseMiddleware);

router.post('/', createUserValid, function (req, res, next) {
//    email, password, firstName, lastName, phoneNumber
    try {
        if (UserService.getByPhoneNumber(req.body.phoneNumber)) {
            throw Error("The user with this phone already exists");
        } else if (UserService.getByEmail(req.body.email)) {
            throw Error("The user with this email already exists");
        }
        let created = UserService.create(req.body);
        if (created) {
            res.data = created;
            next();
        } else {
            throw Error("Unable to create user");
        }
    } catch (err) {
        next(err);
    }
}, errorResponder, responseMiddleware);

router.get('/:id', function (req, res, next) {
    const found = UserService.getById(req.params.id);
    try {
        if (found) {
            res.data = found;
            next();
        } else {
            throw Error("User not found");
        }
    } catch (err) {
        err.status = 404;
        next(err);
    }
}, errorResponder, responseMiddleware);

router.put('/:id', updateUserValid, function (req, res, next) {
    try {
        if (!UserService.getById(req.params.id)) {
            throw Error("User doesn't exist");
        }
        const updated = UserService.update(req.params.id, req.body);
        if (updated) {
            res.data = updated;
            next();
        } else {
            throw Error("Unable to update user");
        }
    } catch (err) {
/*        switch (err.message) {
            case 'User doesn't exist':
                err.status = 404;
                break;
        }*/
        next(err);
    }
}, errorResponder, responseMiddleware);

router.delete('/:id', function (req, res, next) {
    const deleted = UserService.delete(req.params.id);
    try {
        if (deleted.length) {
            res.data = deleted;
            next();
        } else {
            throw Error("Unable to delete user");
        }
    } catch (err) {
        next(err);
    }
}, errorResponder, responseMiddleware);

module.exports = router;