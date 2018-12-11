SELECT rg.rid,
       rg.regex,
       rg.description,
       pe.firstname,
       pe.familyname,
       ts_rank(to_tsvector(concat_ws(' ', rg.description, pe.firstname, pe.familyname)),
               plainto_tsquery('english', $1)) AS rank
FROM
             regex AS rg
  JOIN regexflavor AS rf ON rf.fid = rg.fid
  JOIN     authors AS au ON au.rid = rg.rid
  JOIN      person AS pe ON pe.pid = au.pid
