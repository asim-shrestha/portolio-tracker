//TODO: normalize this table
exports.up = function (knex, Promise) {
    return knex.schema.createTable("companies", (table) => {
        table.increments();
        table.date('date').notNullable().defaultTo(knex.fn.now());
        table.string('symbol', 255).notNullable();
        table.string('industry', 255).notNullable();
        table.string('sector', 255).notNullable();
        table.string('country', 255).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('companies');
};


