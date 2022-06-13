const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', function (req, res, next) {

}, responseMiddleware);

router.post('/', createFighterValid, function (req, res, next) {

}, responseMiddleware);

router.get('/:id', function (req, res, next) {

}, responseMiddleware);

router.put('/:id', updateFighterValid, function (req, res, next) {

}, responseMiddleware);

router.delete('/:id', function (req, res, next) {

}, responseMiddleware);

module.exports = router;