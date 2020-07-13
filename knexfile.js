require('dotenv').config();

module.exports = {
  development: {
    client     : process.env.DB_CLIENT,
    connection:{
        host: process.env.HOST,
        user: process.env.DB_USER,
        password : process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    migrations: {
        directory: './src/db/migrations',
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './src/db/seeds'
    }
  }
};
