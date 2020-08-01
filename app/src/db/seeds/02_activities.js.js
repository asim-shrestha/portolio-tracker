exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('activities').del()
        .then(function () {
            // Inserts seed entries
            return knex('activities').insert([
                // For test@test.com
                { user_id: 1, date: '2020-07-13', price: 1774.41, commission: 9.95, quantity: 75, action: 'buy', symbol: 'TSLA', },
                { user_id: 1, date: '2020-06-26', price: 216.08, commission: 9.95, quantity: 50, action: 'buy', symbol: 'FB', },
                { user_id: 1, date: '2020-07-17', price: 230.17, commission: 9.95, quantity: 1337, action: 'buy', symbol: 'ZM', },
                { user_id: 1, date: '2020-07-17', price: 55, commission: 9.95, quantity: 2000, action: 'buy', symbol: 'PTON', },
                // For test@sfu.ca
                { user_id: 2, date: '2020-07-13', price: 1774.41, commission: 9.95, quantity: 75, action: 'buy', symbol: 'TSLA', },
                { user_id: 2, date: '2020-07-01', price: 200.08, commission: 9.95, quantity: 50, action: 'buy', symbol: 'FB', },
                { user_id: 2, date: '2020-07-17', price: 230.17, commission: 9.95, quantity: 1337, action: 'buy', symbol: 'ZM', },
                { user_id: 2, date: '2020-07-17', price: 55, commission: 9.95, quantity: 2000, action: 'buy', symbol: 'PTON', },
            ]);
        });
};