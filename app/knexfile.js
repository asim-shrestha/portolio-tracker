require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.TESTING ? process.env.DB_TEST_HOST : process.env.DB_HOST,
            port: process.env.TESTING ? '9999' : '5432',
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
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
