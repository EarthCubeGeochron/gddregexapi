DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (pid SERIAL PRIMARY KEY,
					     firstname CHARACTER VARYING,
					    familyname CHARACTER VARYING,
      						uidname CHARACTER VARYING);

DROP TABLE IF EXISTS regex;
CREATE TABLE regex(rid SERIAL PRIMARY KEY,
								 title CHARACTER VARYING,
				         regex CHARACTER VARYING,
				   description CHARACTER VARYING,
								   pid INTEGER REFERENCES person);

GRANT INSERT, SELECT ON TABLE public.person TO regexapi;
GRANT INSERT, SELECT ON TABLE public.regex TO regexapi;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO regexapi;

INSERT INTO person (firstName, familyName, uidname)
VALUES ('Simon', 'Goring', '0000-0002-2700-4605'),
       ('Eric', 'Grimm', '0000-0002-6977-3859'),
       ('John', 'Williams', '0000-0001-6046-9634');
