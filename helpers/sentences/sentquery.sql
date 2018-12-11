WITH regexpass AS (
  SELECT regex FROM regex WHERE rid = ($1)
)
SELECT word, title, year, volume, pages, number, REGEXP_MATCHES(word, (SELECT regex FROM regexpass)) AS string FROM
  sentences AS sent
  JOIN publications AS pub ON pub._gddid = sent._gddid
WHERE sent.word ~ (SELECT regex FROM regexpass)
ORDER BY random()
LIMIT 40
