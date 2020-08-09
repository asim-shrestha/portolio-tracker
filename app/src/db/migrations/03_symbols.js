exports.up = function (knex, Promise) {
    return knex.schema.createTable("symbols", (table) => {
        table.increments();
        table.date('date').notNullable();
        table.specificType('symbols', 'text Array').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('symbols');
};


