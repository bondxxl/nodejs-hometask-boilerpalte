const {user} = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    let keys = Object.keys(req.body);
    let modelKeys = Object.keys(user);
    if (
        //    email, password, firstName, lastName, phoneNumber
        req.body
        && keys.length === modelKeys.length - 1
        && !keys.includes('id')
        && keys.every(key => modelKeys.includes(key))
    ) {
        next();
    } else {
        res.status(400).send()
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    let keys = Object.keys(req.body);
    let modelKeys = Object.keys(user);
    if (
        req.body
        && keys.length
        && !keys.includes('id')
        && keys.every(key => modelKeys.includes(key))
    ) {
        next();
    } else {
        res.status(400).send()
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;