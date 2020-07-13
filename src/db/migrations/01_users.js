exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments('user_id');
        table.string('username').unique();
        table.string('password');
        table.boolean("admin");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};