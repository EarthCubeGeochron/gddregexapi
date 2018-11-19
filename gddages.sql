// This is the strict chronology data, but does not give the geochron data. . .
SELECT     ds.datasetid,
            st.sitename,
        dst.datasettype,
		chroncontroltype,
		agetype,
		depth,
		json_agg(age) AS ages,
		CONCAT('https://dx.doi.org/', doi) AS doi
FROM
          ndb.chroncontrols AS cc
JOIN  ndb.chroncontroltypes AS cct ON cc.chroncontroltypeid = cct.chroncontroltypeid
JOIN       ndb.chronologies AS chr ON chr.chronologyid = cc.chronologyid
JOIN           ndb.agetypes AS aty ON aty.agetypeid = chr.agetypeid
JOIN ndb.datasets AS ds ON chr.collectionunitid = ds.collectionunitid
JOIN ndb.datasetpublications AS dsp ON dsp.datasetid = ds.datasetid
JOIN ndb.publications AS pub ON pub.publicationid = dsp.publicationid
JOIN ndb.datasettypes AS dst ON ds.datasettypeid = dst.datasettypeid
JOIN ndb.collectionunits AS cu ON cu.collectionunitid = ds.collectionunitid
JOIN ndb.sites AS st ON cu.siteid = st.siteid
WHERE pub.doi IS NOT NULL AND
NOT ds.datasettypeid = 1
GROUP BY dst.datasettype, chroncontroltype, agetype, depth, doi, ds.datasetid, st.sitename
ORDER BY doi, depth
