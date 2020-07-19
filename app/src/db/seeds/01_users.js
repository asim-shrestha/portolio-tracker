exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    email: 'test@test.com',
                    password: '123456',
                    first_name: 'test',
                    last_name: 'test',
                }
            ]);
        });
};