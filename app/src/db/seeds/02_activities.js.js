exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('activities').del()
        .then(function () {
            // Inserts seed entries
            return knex('activities').insert([
                {
                    user_id: 1,
                    date: '2020-07-13',
                    price:1774.41 ,
                    commission: 9.95,
                    quantity: 1337,
                    action: 'buy',
                    symbol: 'TSLA',
                }
            ]);
        });
};