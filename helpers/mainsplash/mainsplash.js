/* A script to help load in the information needed for the main splash
   screen. */

const path = require('path');

// get global database object
var db = require('../../database/pgp_db');
var pgp = db.$config.pgp;

// Helper for linking to external query files:
function sql (file) {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, {minify: true});
}

const regexlist = sql('./authorregex.sql');

function getregexlist (req, res, next) {

  var result = db.any(regexlist, req.query)
    .then(function (data) {
        return(data);
    })
    .catch(function (err) {
      return next(err);
    });

  return result;
};

module.exports.getregexlist = getregexlist;
