exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    email: 'test@test.com',
                    password: '$2b$10$XiEydWrYtvzBTW3Q.x7gNeYPGiL6m/Osh/BPOsdUX9EScFdKxMfcy',
                    first_name: 'test',
                    last_name: 'test',
                }
            ]);
        });
};