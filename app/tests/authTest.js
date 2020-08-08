import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../server'

// Chai configs
chai.use(chaiHttp)
chai.should()

const testUser = {
    email: 'chaiTester@test.com',
    password: '123456',
    first_name: 'chai',
    last_name: 'tester'
}

describe("Authentication Test", () => {
    describe("GET /", () => {
        it("Should return landing page with status 200", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })

    describe("POST /register success", () => {
        it('Should return new user created', (done) => {
            chai.request(app)
                .post('/auth/register')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.userCreated.should.be.equal(true)
                    done()
                })
        })
    })

    describe("POST /register duplicate", () => {
        it('Should return email already registered', (done) => {
            chai.request(app)
                .post('/auth/register')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(409)
                    done()
                })
        })
    })

    describe("POST /login success", () => {
        it('Should return successful login', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.auth.should.be.equal(true)

                    testUser.token = res.body.token

                    done()
                })
        })
    })

    describe("GET /findUser success", () => {
        it('Should get user data', (done) => {
            chai.request(app)
                .get('/auth/findUser')
                .set('Authorization', `JWT ${testUser.token}`) // set Authorization header
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.auth.should.be.equal(true)
                    res.body.email.should.be.equal(testUser.email)
                    done()
                })
        })
    })

    describe("GET /findUser fail", () => {
        it('Should get user data', (done) => {
            chai.request(app)
                .get('/auth/findUser')  // no Authorization header
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })

    describe("Delete test user", () => {
        it('Should delete test user', (done) => {
            chai.request(app)
                .delete('/auth/deleteUser')
                .send({ email: testUser.email })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.delete.should.be.equal(true)
                    res.body.recordsDeleted.should.be.equal(1)
                    done()
                })
        })
    })

    describe("POST /login fail", () => {
        it('Should return failed login', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(403)
                    done()
                })
        })
    })
})
