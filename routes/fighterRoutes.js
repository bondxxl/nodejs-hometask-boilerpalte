const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')
    console.log(err.status);
    const status = err.status || 400
    res.status(status);
    res.err = err;
    next();
}

router.get('/', function (req, res, next) {
    const all = FighterService.getAll();
    try {
        if (all) {
            res.data = all;
            next();
        } else {
            throw Error("Unable to get fighters");
        }
    } catch (err) {
        err.status = 404;
        next(err);
    }
}, errorResponder, responseMiddleware);

router.post('/', createFighterValid, function (req, res, next) {
    try {
/*        let regExp = new RegExp(`${req.body.name}`, 'i');
        if (FighterService.getAll().some(fighter => fighter.name.match(regExp))) {*/
        if (FighterService.getAll()
            .some(fighter => fighter.name.toLowerCase() === req.body.name.toLowerCase())) {
            throw Error("The fighter with this name already exists");
        }
        const created = FighterService.create(req.body);
        if (created) {
            res.data = created;
            next();
        } else {
            throw Error("Unable to create fighter");
        }
    } catch (err) {
        next(err);
    }
}, errorResponder, responseMiddleware);

router.get('/:id', function (req, res, next) {
    const found = FighterService.getById(req.params.id);
    try {
        if (found) {
            res.data = found;
            next();
        } else {
            throw Error("Fighter not found");
        }
    } catch (err) {
        err.status = 404;
        next(err);
    }
}, errorResponder, responseMiddleware);

router.put('/:id', updateFighterValid, function (req, res, next) {
    const updated = FighterService.update(req.params.id, req.body);
    try {
        if (updated) {
            res.data = updated;
            next();
        } else {
            throw Error("Unable to update fighter");
        }
    } catch (err) {
        next(err);
    }
}, errorResponder, responseMiddleware);

router.delete('/:id', function (req, res, next) {
    const deleted = FighterService.delete(req.params.id);
    try {
        if (deleted.length) {
            res.data = deleted;
            next();
        } else {
            throw Error("Unable to delete fighter");
        }
    } catch (err) {
        next(err);
    }
}, errorResponder, responseMiddleware);

module.exports = router;