const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const keys = Object.keys(req.body);
    const modelKeys = Object.keys(fighter);

    const Check = {
        is: function (predicate, message) {
            try {
                if (predicate) {
                    return this;
                }
                throw Error(message);
            } catch (err) {
                // next(err);
                res.status(400);
                res.err = err;
                next();
            }
        },
        end: () => next()
    }
    // power - число, 1 <= power <= 100
    // defense - число, 1 <= defense <= 10
    // health - число, 80 <= health <= 120, необов'язкове поле(за замовчуванням - 100)
    Check
        .is(req.body, "Fighter data is empty")
        .is(keys.length < modelKeys.length && keys.length > modelKeys.length - 3, "Mismatch number of properties")
        .is(!keys.includes('id'), "Fighter contains id")
        .is(String(req.body.name).length > 0, "Name is empty")
        .is((!keys.includes('health') || String(req.body.health).length > 0), "Health is empty")
        .is(keys.every(key => modelKeys.includes(key)), "Mismatch keys of properties")
        .is((+req.body.power >= 1 && +req.body.power <= 100), "Power is incorrect")
        .is((+req.body.defense >= 1 && +req.body.defense <= 10), "Defense is incorrect")
        .is((!keys.includes('health') || (+req.body.health >= 80 && +req.body.health <= 120)), "Health is incorrect")
        .end()
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    const keys = Object.keys(req.body);
    const modelKeys = Object.keys(fighter);

    const Check = {
        is: function (predicate, message) {
            try {
                if (predicate) {
                    return this;
                }
                throw Error(message);
            } catch (err) {
                // next(err);
                res.status(400);
                res.err = err;
                next();
            }
        },
        end: () => next()
    }
    // power - число, 1 <= power <= 100
    // defense - число, 1 <= defense <= 10
    // health - число, 80 <= health <= 120, необов'язкове поле(за замовчуванням - 100)
    Check
        .is(req.body, "Fighter data is empty")
        .is(keys.length, "Fighter haven't properties")
        .is(!keys.includes('id'), "Fighter contains id")
        .is(keys.every(key => modelKeys.includes(key)), "Mismatch keys of properties")
        .is((!keys.includes('health') || String(req.body.health).length > 0), "Health is empty")
        .is((!keys.includes('name') || String(req.body.name).length > 0), "Name is empty")
        .is((!keys.includes('health') || (+req.body.health >= 80 && +req.body.health <= 120)), "Health is incorrect")
        .is((!keys.includes('power') || (+req.body.power >= 1 && +req.body.power <= 100)), "Power is incorrect")
        .is((!keys.includes('defense') || (+req.body.defense >= 1 && +req.body.defense <= 10)), "Defense is incorrect")
        .end()
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;