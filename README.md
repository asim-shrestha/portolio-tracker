### Overview

Our app helps you track your investment portfolio. 

### Setup


Please install the following global dependencies, if not installed:

    sudo apt-get install postgresql
    sudo npm install knex -g

setup postgres:

    sudo psql -U postgres

* !! WARNING !! The TA should not have to setup the DB !!
* !! WARNING !! The TA should not have to setup the DB !!
* !! WARNING !! The TA should not have to setup the DB !!

setup database:

    CREATE USER dev WITH PASSWORD 'dev';
    CREATE DATABASE portfolio_tracker_dev;
    ALTER DATABASE portfolio_tracker_dev OWNER TO dev;

install packages:

    sudo npm install

build database: 

    sudo npm run migrate

run server:

    sudo npm start
    Travel to http://localhost:3000/ in your web browser 

