# GeoDeepDive Regex Library API

This API serves as an interface for a GeoDeepDive derivative database that helps manage and evaluate regular expressions and search terms that can be used by researchers to develop applications that can take advantage of the GeoDeepDive library and computational infrastructure.

## Development

The application is based on two components, a Postgres database and a node.js/express.js API that is served to the web.  The API is primarily designed to be used by the GeoDeepDive Regex Library application, which is a single-page application deployed using Vue.js.

## Contributions

* [Simon Goring](http://goring.org)

## How to Use this Repository

### Setting up Postgres

To set up the Postgres database and the associated tablespaces you must first create a database.  This example assumes that you have a user `postgres` and have a Linux/MacOS system (and have [postgres installed](https://www.postgresql.org/docs/current/tutorial-install.html)!)

```bash
$ psql -U postgres
postgres=# CREATE DATABASE regexdb;
postgres=# \q
```

Once the database is created you can then run the bash script `builddb.sh` to create the main database tables.  If you have set passwords for your database, have a different host, or user names then please validate that your [`.pgpass` file](https://www.postgresql.org/docs/current/libpq-pgpass.html) is correct.

The bash script takes the parameter `NEWPASSWORDFORAPI`.  This will be the password you will assign to a new user, regexapi, the user that will connect to the database through the API.

```bash
bash builddb.sh NEWPASSWORDFORAPI
```

### 
