/* Some functions to work with new users: */

const path = require('path');

let rp = require('../checkparam.js');

// get global database object
var db = require('../../database/pgp_db');
var pgp = db.$config.pgp;

// Helper for linking to external query files:
function sql (file) {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, {minify: true});
}

const addregex = sql('./addregex.sql');

function postnewregex (req, res, next) {

  var reqfields = ['regex', 'description', 'flavor'];
  var all_good = rp.checkparams(req.query, reqfields);

  if (all_good === false) {
    res.status(500)
      .json({
        status: 'Failure',
        data: Object.keys(req.query),
        message: 'All parameters ' + req.fields + ' must be passed.'
      });
  }

  db.any(addregex, req.query)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Added new regex statement.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function callregex (req, res, next) {


}

module.exports.postnewregex = postnewregex;
