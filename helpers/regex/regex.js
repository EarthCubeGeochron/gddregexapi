/* Some functions to access the regex data in the database */

const path = require('path');

// get global database object
var db = require('../../database/pgp_db');
var pgp = db.$config.pgp;

// Helper for linking to external query files:
function sql (file) {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, {minify: true});
}

const queryregexsql = sql('./regexquery.sql');

function queryregex (req, res, next) {

  if (Object.keys(req.query).includes('q')) {
    value = req.query.q;
  } else {
    value = '';
  }

  var result = db.any(queryregexsql, [value])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Regex query response.'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'failure',
          data: err,
          message: 'Failed to obtain regex data.'
        });
      return next(err);
    });

  return result;
};

module.exports.queryregex = queryregex;
