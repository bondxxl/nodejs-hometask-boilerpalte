const {user} = require('../models/user');

// https://verifalia.com/validate-email
const gmailRGEX = /^[a-z\d](([.+])?[a-z\d]){5,}@g(oogle)?mail\.com$/;
const phoneRGEX = /^\+380\d{9}$/;

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    let keys = Object.keys(req.body);
    let modelKeys = Object.keys(user);
    if (
        //    email, password, firstName, lastName, phoneNumber
        req.body
        && keys.length === modelKeys.length - 1
        && !keys.includes('id')
        && String(req.body.firstName).length > 0
        && String(req.body.lastName).length > 0
        && keys.every(key => modelKeys.includes(key))
        && gmailRGEX.test(req.body.email)
        && phoneRGEX.test(req.body.phoneNumber)
        && String(req.body.password).length >= 3
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
        && (!req.body.firstName || String(req.body.firstName).length > 0)
        && (!req.body.lastName || String(req.body.lastName).length > 0)
        && (!req.body.email || gmailRGEX.test(req.body.email))
        && (!req.body.phoneNumber || phoneRGEX.test(req.body.phoneNumber))
        && (!req.body.password || String(req.body.password).length >= 3)
    ) {
        next();
    } else {
        res.status(400).send()
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;