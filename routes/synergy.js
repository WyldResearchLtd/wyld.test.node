var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Synergy = require('../models/synergy.js');

//CREATE
/* POST /v1/synergy/ */
router.post('/', function(req, res, next) {
  Synergy.create(req.body, function (err, create) {
    if (err) return next(err);
    res.json(create);
  });
});

// READ
/* GET /v1/synergy/ */
router.get('/', function(req, res, next) {
  Synergy.find(function (err, read) {
    if (err) return next(err);
    res.json(read);
  });
});

/* GET /v1/synergy/:id/ */
router.get('/:id', function(req, res, next) {
  Synergy.findById(req.params.id, function (err, read) {
    if (err) return next(err);
    res.json(read);
  });
});

//UPDATE
/* PUT /v1/synergy/:id */
router.put('/:id', function(req, res, next) {
  Synergy.findByIdAndUpdate(req.params.id, req.body, function (err, update) {
    if (err) return next(err);
    res.json(update);
  });
});

//DESTROY
/* DELETE /v1/synergy/:id */
router.delete('/:id', function(req, res, next) {
  Synergy.findByIdAndRemove(req.params.id, req.body, function (err, destroy) {
    if (err) return next(err);
    res.json(destroy);
  });
});

module.exports = router;
