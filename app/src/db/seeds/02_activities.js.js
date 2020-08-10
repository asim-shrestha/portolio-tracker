exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('activities').del()
        .then(function () {
            // Inserts seed entries
            return knex('activities').insert([
                // For test@test.com
                { user_id: 1, date: '2020-07-13', price: 1774.41, commission: 9.95, quantity: 150, action: 'buy', symbol: 'TSLA', },
                { user_id: 1, date: '2020-06-26', price: 216.08, commission: 9.95, quantity: 300, action: 'buy', symbol: 'FB', },
                { user_id: 1, date: '2020-07-17', price: 230.17, commission: 9.95, quantity: 1337, action: 'buy', symbol: 'ZM', },
                { user_id: 1, date: '2020-03-16', price: 322.17, commission: 9.95, quantity: 150, action: 'buy', symbol: 'SHOP', },
                // For test@sfu.ca
                { user_id: 2, date: '2020-07-13', price: 1774.41, commission: 9.95, quantity: 150, action: 'buy', symbol: 'TSLA', },
                { user_id: 2, date: '2020-07-01', price: 200.08, commission: 9.95, quantity: 300, action: 'buy', symbol: 'FB', },
                { user_id: 2, date: '2020-07-17', price: 230.17, commission: 9.95, quantity: 1337, action: 'buy', symbol: 'ZM', },
                { user_id: 2, date: '2020-03-16', price: 322.17, commission: 9.95, quantity: 150, action: 'buy', symbol: 'SHOP', },
            ]);
        });
};