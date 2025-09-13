var express = require('express');
var router = express.Router();

const IndexController = require('../controller/IndexController');
const indexController = new IndexController();

router.get('/', indexController.home);

router.get('/:id', indexController.userPage);

router.delete('/:id', indexController.deleteUser);

router.put('/:id', indexController.updateUser);

router.get('/favicon.ico', (req, res) => res.status(204).end());

module.exports = router;