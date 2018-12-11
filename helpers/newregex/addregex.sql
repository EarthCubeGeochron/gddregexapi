INSERT INTO regex (regex, description, fid)
SELECT ${regex} AS regex,
   ${description} AS description,
   fl.fid
FROM regexflavor AS fl WHERE fl.flavor = ${flavor}
RETURNING regex, description;
