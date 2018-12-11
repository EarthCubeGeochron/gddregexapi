/* Some functions to access the regex data in the database */

const path = require('path');
const pgp = require('pg-promise')

// get global database object
var db = require('../../database/pgp_db');

function addkeywords (req, res, next) {

  var keywords = String(req.query.keywords).split(',')

  var result = db.tx(t => {
    const queries = keywords.map(l => {
        return t.none('INSERT INTO keywords(keyword) VALUES($1)', l);
    });
      return t.batch(queries);
    })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Added keywords.'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'failure',
          data: err,
          message: 'Failed to add keywords.'
        });
      return next(err);
    });

  return result;
};

module.exports.addkeywords = addkeywords;
