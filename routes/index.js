var express = require('express');
let tezos = require('./../controller/TezosController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create',tezos.createAccount);
module.exports = router;
