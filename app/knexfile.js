require('dotenv').config();

module.exports = {
  development: {
    client     : process.env.DB_CLIENT,
    connection:{
        host: process.env.DB_HOST,
        user: process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
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
