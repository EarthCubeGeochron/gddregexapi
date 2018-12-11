function checkparams(query, required) {

  var keys = Object.keys(query)

  // Validate the input query.  Must include all elements:
  var all_good = required
    .map(x => keys.includes(x))
    .every(x => x)

    return(all_good);
}

module.exports.checkparams = checkparams;
