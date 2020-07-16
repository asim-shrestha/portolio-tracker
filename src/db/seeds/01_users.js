exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'user1',
          password: '123456',
          first_name: 'test',
          last_name: 'test',
          email: 'test@test.com',
          phone: '123456789',
          admin: false
        }
      ]);
});
};