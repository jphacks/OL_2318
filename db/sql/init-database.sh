#!/usr/bin/env bash
#wait for the MySQL Server to come up
#sleep 90s

# source ../../.env
#run the setup script to create the DB and the schema in the DB
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < "/docker-entrypoint-initdb.d/001-create-tables.sql"
