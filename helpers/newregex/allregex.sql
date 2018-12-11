SELECT rg.regex,
       rg.description,
       rf.flavor,
       pe.firstname,
       pe.lastname
FROM
             regex AS rg
  JOIN regexflavor AS rf ON rf.fid = rg.fid
  JOIN     authors AS au ON au.rid = rg.rid
  JOIN      person AS pe ON pe.pid = au.pid
