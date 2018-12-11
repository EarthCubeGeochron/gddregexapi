SELECT rx.regex, rx.description, ps.firstname, ps.familyname
FROM
  public.regex AS rx
  JOIN authors AS au ON au.rid = rx.rid
  JOIN  person AS ps ON ps.pid = au.pid
