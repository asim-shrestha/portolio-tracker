### Overview

This is the Portflio Tracker app project. 

### Setup

Please install the following global dependencies, if not installed:

    sudo apt-get install postgresql
    sudo npm install knex -g

setup postgres:

    sudo -u postgres psql

setup database:

    CREATE USER dev WITH PASSWORD 'dev';
    CREATE DATABASE portfolio_tracker_dev;
    ALTER DATABASE portfolio_tracker_dev OWNER TO dev;

install packages:

    sudo npm install

build database: 

    sudo knex migrate:rollback
    sudo knex migrate:latest
    sudo knex seed:run

run server:

    sudo npm start
    http://localhost:3000/

