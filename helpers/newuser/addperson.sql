WITH
  personid AS (INSERT INTO person (firstname, familyname)
    VALUES (${firstname}, ${familyname})
    RETURNING pid),
  uniqueid AS (INSERT INTO uid(uidname, utid)
    VALUES(${uid}, (SELECT uidtype.utid FROM uidtype WHERE uidtype.uidtype = ${uidtype} ))
    RETURNING uid)

INSERT INTO personlink(pid, uid)
  VALUES((SELECT pid FROM personid), (SELECT uid FROM uniqueid))
  RETURNING pid;
