var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/', register);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/names/:id', getByName)
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function authenticate(req, res) {
  userService.authenticate(req.body.username, req.body.password)
    .then(function (user) {
      if (user) {
        // authentication successful
        res.send(user);
      } else {
        // authentication failed
        res.status(401).send('Username or password is incorrect');
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function register(req, res) {
  userService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  userService.getAll()
    .then(function (users) {
      console.log(users);
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getById(req, res){
  userService.getById(req.params.id)
    .then(function (user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getByName(req, res){
  userService.getByName(req.params.id)
    .then(function (user) {
      if (user) {
        console.log(user);
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  userService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  userService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
