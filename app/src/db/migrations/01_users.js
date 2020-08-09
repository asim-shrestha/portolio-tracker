exports.up = function (knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments();
        table.string('email', 255).unique();
        table.string('password', 255).notNullable();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};


