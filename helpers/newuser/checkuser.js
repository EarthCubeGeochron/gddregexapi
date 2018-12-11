/* Some functions to work with new users: */

const path = require('path');

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

function checkuser(req, res, next) {

  /* Ensure that the query contains the content:
  firstname, lastname, uid, uidtype
  */

  var orcid = req.params.uid;

  console.log(orcid)

  var validOrcid = orcid.match(/(\d{4})-(\d{4})-(\d{4})-(\d{3}[0-9X])/g);

  if (validOrcid === false) {
    res.status(500)
      .json({
        status: 'Failure',
        data: req.params.uid,
        message: 'A valid ORCID ID must be passed (e.g., 0000-0000-0000-0000).'
      });
  }

  var result = db.any("SELECT * FROM check_uid($1)", req.params.uid)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Returning Users.'
        });
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'failure',
          data: err,
          message: 'Failed to check users.'
        });
      return next(err);
    });

  return result;
};

module.exports.checkuser = checkuser;
