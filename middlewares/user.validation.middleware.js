const {user} = require('../models/user');

// https://verifalia.com/validate-email
const gmailRGEX = /^[a-z\d](([.+])?[a-z\d]){5,}@g(oogle)?mail\.com$/;
const phoneRGEX = /^\+380\d{9}$/;

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const keys = Object.keys(req.body);
    const modelKeys = Object.keys(user);
    const Check = {
        is: function (predicate, message) {
            try {
                if (predicate) {
                    return this;
                }
                throw Error(message);
            } catch (err) {
                next(err);
            }
        },
        end: () => next()
    }
    Check
        .is(req.body, "User is empty")
        .is(keys.length === modelKeys.length - 1, "Mismatch number of properties")
        .is(!keys.includes('id'), "User contains id")
        .is(String(req.body.firstName).length > 0, "Firstname is empty")
        .is(String(req.body.lastName).length > 0, "Lastname is empty")
        .is(keys.every(key => modelKeys.includes(key)), "Mismatch keys of properties")
        .is(gmailRGEX.test(req.body.email), "Incorrect gmail")
        .is(phoneRGEX.test(req.body.phoneNumber), "Incorrect phone number format")
        .is(String(req.body.password).length >= 3, "Password length less then 3")
        .end()
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const keys = Object.keys(req.body);
    const modelKeys = Object.keys(user);
    const Check = {
        is: function (predicate, message) {
            try {
                if (predicate) {
                    return this;
                }
                throw Error(message);
            } catch (err) {
                next(err);
            }
        },
        end: () => next()
    }

    Check
        .is(req.body, "User is empty")
        .is(keys.length, "User haven't properties")
        .is(!keys.includes('id'), "User contains id")
        .is(keys.every(key => modelKeys.includes(key)), "Mismatch keys of properties")
        .is((!keys.includes('firstName') || String(req.body.firstName).length > 0), "Firstname is empty")
        .is((!keys.includes('lastName') || String(req.body.lastName).length > 0), "Lastname is empty")
        .is((!req.body.email || gmailRGEX.test(req.body.email)), "Incorrect gmail")
        .is((!req.body.phoneNumber || phoneRGEX.test(req.body.phoneNumber)), "Incorrect phone number format")
        .is((!req.body.password || String(req.body.password).length > 2), "Password length less then 3")
        .end()
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;