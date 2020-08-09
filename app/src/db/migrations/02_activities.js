exports.up = function (knex, Promise) {
    return knex.schema.createTable("activities", (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.date('date').notNullable();
        table.decimal('price', 14, 2).notNullable();
        table.decimal('commission', 14, 2).defaultTo(0.00);
        table.integer('quantity', 10).notNullable();
        table.enu('action', ['buy', 'sell']).notNullable();
        table.string('symbol', 255).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('activities');
};

