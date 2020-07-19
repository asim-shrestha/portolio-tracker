exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
        table.string('first_name');
        table.string('last_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};


