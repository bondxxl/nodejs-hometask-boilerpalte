const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', function (req, res, next) {
    const all = UserService.getAll();
    try {
        if (all) {
            res.data = all;
        } else {
            throw Error("Unable to get users");
        }
    } catch (err) {
        // next(err);
        res.status(404);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, function (req, res, next) {
//    email, password, firstName, lastName, phoneNumber
    try {
        if (UserService.getByPhoneNumber(req.body.phoneNumber)) {
            throw Error("The user with this phone already exists");
        } else if (UserService.getByEmail(req.body.email)) {
            throw Error("The user with this email already exists");
        }
        const created = UserService.create(req.body);
        if (created) {
            res.data = created;
        } else {
            throw Error("Unable to create user");
        }
    } catch (err) {
        // next(err);
        res.status(400);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', function (req, res, next) {
    const found = UserService.getById(req.params.id);
    try {
        if (found) {
            res.data = found;
        } else {
            throw Error("User not found");
        }
    } catch (err) {
        // next(err);
        res.status(404);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, function (req, res, next) {
    const updated = UserService.update(req.params.id, req.body);
    try {
        if (updated) {
            res.data = updated;
        } else {
            throw Error("Unable to update user");
        }
    } catch (err) {
        // next(err);
        res.status(400);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', function (req, res, next) {
    const deleted = UserService.delete(req.params.id);
    try {
        if (deleted.length) {
            res.data = deleted;
        } else {
            throw Error("Unable to delete user");
        }
    } catch (err) {
        // next(err);
        res.status(400);
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;