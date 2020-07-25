exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('activities').del()
        .then(function () {
            // Inserts seed entries
            return knex('activities').insert([
                { user_id: 1, date: '2020-07-13', price: 1774.41, commission: 9.95, quantity: 1337, action: 'buy', symbol: 'TSLA', },
                { user_id: 1, date: '2020-07-10', price: 900.00, commission: 9.95, quantity: 250, action: 'buy', symbol: 'SHOP', },
                { user_id: 1, date: '2020-07-17', price: 230.17, commission: 9.95, quantity: 20003, action: 'buy', symbol: 'ZM', },
                { user_id: 1, date: '2020-07-17', price: 55, commission: 9.95, quantity: 200000, action: 'buy', symbol: 'PTON', },
            ]);
        });
};