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

describe("Dashboard Test", () => {
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

    describe("GET /performance/:user_id", () => {
        it('Should return performance graph data', (done) => {
            testUser.user_id = 1;
            chai.request(app)
                .get(`/api/performance/${testUser.user_id}`)
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("FAIL GET /performance/:user_id", () => {
        it('Should fail since no auth token is set', (done) => {
            testUser.user_id = 1;
            chai.request(app)
                .get(`/api/performance/${testUser.user_id}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe("GET /symbol/:symbol", () => {
        it('Should return symbol', (done) => {
            const symbol = 'FB';
            chai.request(app)
                .get(`/api/symbol/${symbol}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe("GET /holdings/:user_id", () => {
        it('Should return performance graph data', (done) => {
            testUser.user_id = 1;
            chai.request(app)
                .get(`/api/holdings/${testUser.user_id}`)
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("FAIL GET /holdings/:user_id", () => {
        it('Should fail since no auth token is set', (done) => {
            testUser.user_id = 1;
            chai.request(app)
                .get(`/api/holdings/${testUser.user_id}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

});
