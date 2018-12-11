/* Some functions to work with new users: */

const path = require('path');
let rp = require('../checkparam.js');

// get global database object
var db = require('../../database/pgp_db');
var pgp = db.$config.pgp;

// Helper for linking to external query files:
function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, {
    minify: true
  });
}

const addperson = sql('./addperson.sql');

function postnewuser(req, res, next) {

  /* Ensure that the query contains the content:
  firstname, lastname, uid, uidtype
  */

  var all_good = rp.checkparams(req.query, ['firstname', 'familyname', 'uid', 'uidtype']);

  if (all_good === false) {
    res.status(500)
      .json({
        status: 'Failure',
        data: Object.keys(req.query),
        message: 'All parameters, (firstname, familyname, uid, and uidtype) must be passed.'
      });
  }

  var result = db.any(addperson, req.query)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Added new user.'
        });
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'failure',
          data: err,
          message: 'Failed to add new user.'
        });
      return next(err);
    });

  return result;
};

module.exports.postnewuser = postnewuser;
