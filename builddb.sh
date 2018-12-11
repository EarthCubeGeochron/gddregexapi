#!/bin/bash

user="CREATE USER regexapi PASSWORD '$1';"
echo $user >> ./sql/create_db.sql

psql -U postgres -d regexdb -a -f ./sql/create_db.sql
