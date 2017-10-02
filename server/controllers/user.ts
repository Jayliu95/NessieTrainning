var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/', register);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/names/:id', getUserByName);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

function authenticateUser(req, res) {
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

function getAllUsers(req, res) {
  userService.getAll()
    .then(function (users) {
      console.log(users);
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getUserById(req, res){
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

function getUserByName(req, res){
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

function updateUser(req, res) {
  userService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function deleteUser(req, res) {
  userService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
