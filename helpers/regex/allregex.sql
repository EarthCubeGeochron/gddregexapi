SELECT *
FROM regex AS re
JOIN regexflavor AS rf ON re.fid = rf.fid;
