import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Chai configs
chai.use(chaiHttp);
chai.should();

const testUser = {
    email: 'test@test.com',
    password: '123456',
};

describe("Activity Test", () => {
    describe("POST /login success", () => {
        it('Should return successful login', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.auth.should.be.equal(true);

                    // save token for later use
                    testUser.token = res.body.token;

                    done();
                });
        });
    });

    describe("POST /activity/order success", () => {
        it('Should successfully add activity', (done) => {

            const testOrder = {
                user_id: 1,
                date: '2020-08-01',
                price: 100,
                commission: 10,
                quantity: 10,
                symbol: 'FB',
                action: 'buy'
            };

            chai.request(app)
                .post('/api/activity/order')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .send(testOrder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    describe("POST /activity/order fail", () => {
        it('Should fail to add activity (no auth header)', (done) => {

            const testOrder = {
                user_id: 1,
                date: '2020-08-01',
                price: 100,
                commission: 10,
                quantity: 10,
                symbol: 'FB',
                action: 'buy'
            };

            chai.request(app)
                .post('/api/activity/order')
                .send(testOrder)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe("POST /activity/upload success", () => {
        it('Should fail to add activity (no auth header)', (done) => {

            const testCSV = {
                data: [
                    ['symbol', 'price', 'quantity', 'date'],
                    ['FB', '3333', '33', '2020-08-02']
                ],
                map: {
                    symbol: 0,
                    price: 1,
                    quantity: 2,
                    date: 3
                }
            };

            chai.request(app)
                .post('/api/activity/upload')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .send(testCSV)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("Delete stock FB", () => {
        it('Should delete all FB stocks', (done) => {
            chai.request(app)
                .delete('/api/activity/delete')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .send({ symbol: 'FB' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.delete.should.be.equal(true);
                    done();
                });
        });
    });


});
