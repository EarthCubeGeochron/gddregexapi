/* Some functions to access the regex data in the database */

const path = require('path');
const pgp = require('pg-promise')

// get global database object
var db = require('../../database/pgp_db');

function createregex (req, res, next) {

  var callparam = ['uidname', 'regex', 'description', 'title', 'flavor']

  goodcall = callparam.every(x => Object.keys(req.query).includes(x));

  if (goodcall === false) {
    result = res.status(500)
      .json({
        status: 'failure',
        data: [],
        message: 'You must send uidname, regex, description, title and flavor values.'
      });
    return result;
  }

  funcall = "SELECT * FROM public.addregex(${uidname},${regex}, \
            ${description},${title},${flavor})"

  const query = pgp.as.format(funcall, req.query)

  var result = db.any(query)
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

module.exports.createregex = createregex;
