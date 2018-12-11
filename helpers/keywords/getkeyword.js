/* Some functions to access the regex data in the database */

const path = require('path');
const pgp = require('pg-promise')

// get global database object
var db = require('../../database/pgp_db');

function getkeywords (req, res, next) {

  var keywords = String(req.query.keywords).split(',')

  var result = db.any("SELECT keyword FROM public.keywords")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Returning keywords.'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'failure',
          data: err,
          message: 'Failed to return keywords.'
        });
      return next(err);
    });

  return result;
};

module.exports.getkeywords = getkeywords;
