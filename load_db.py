import psycopg2
import json


with open('db_connect.json') as f:
    data = json.load(f)

conn = psycopg2.connect(**data)
cur = conn.cursor()

with open('sql/data/people.json') as persons:
    data = json.load(persons)
    for dat in data:
        per_test = cur.execute("""
          SELECT * FROM person
          WHERE firstName  LIKE %s  AND
                familyName LIKE %s  AND
                uidname    LIKE %s""", [dat['firstName'], dat['familyName'], dat['identifier']['id']])
        if str(per_test) == 'None':
            cur.execute("""
                 INSERT INTO person (firstName, familyName, uidname)
                 VALUES (%s, %s, %s);""", [dat['firstName'], dat['familyName'], dat['identifier']['id']])

with open('sql/data/regexes.json') as regexes:
    data = json.load(regexes)
    for dat in data:
        regtest = cur.execute("""
          SELECT * FROM regex
          WHERE regex  LIKE %s""", [dat['regex']])
        if str(regtest) == 'None':
            cur.execute("""
                 INSERT INTO regex (title, regex, description, pid)
                 VALUES (%s, %s, %s, (SELECT pid FROM person WHERE uidname = %s));""",
                 [dat['title'], dat['regex'], dat['description'], dat['orcid']])
