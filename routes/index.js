var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GDD regex generator'});
});

// Regex route allows GET (get all regex or some) and POST (add a new one)
router.get('/regex/', function(req, res, next) {
  // Return all the regex calls.
  var rgin = require('../helpers/regex/regex.js');
  rgin.queryregex(req, res, next);
});

router.post('/regex/', function(req, res, next) {
  // Return all the regex calls.
  var rgcreate = require('../helpers/regex/createregex.js');
  rgcreate.createregex(req, res, next);
});

/* GET user by ORCID*/
router.get('/user/:uid', function (req, res, next) {
  var newuser = require('../helpers/newuser/checkuser.js');
  newuser.checkuser(req, res, next);
});

/* POST new user */
router.post('/user/', function (req, res, next) {
  var newuser = require('../helpers/newuser/newuser.js');
  newuser.postnewuser(req, res, next);
});

// Add keywords
router.post('/keywords/', function (req, res, next) {
  var kwd = require('../helpers/keywords/addkeyword.js');
  kwd.addkeywords(req, res, next);
});

router.get('/keywords/', function (req, res, next) {
  var kwd = require('../helpers/keywords/getkeyword.js');
  kwd.getkeywords(req, res, next);
});

router.get('/sentences/', function (req, res, next) {
  var snt = require('../helpers/sentences/sentences.js');
  snt.sentquery(req, res, next);
});

module.exports = router;
