const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const uri = 'http://localhost:5000';
const path = '/api/v1';

describe('Usuário', () => {
    describe('/POST User.Signup', () => {
        it('Gerando usuário com POST faltando phone', (done) => {
            chai.request(uri)
            .post(path + '/user/signup')
            .send({ nick: 'rafa', email: 'rafael@gmail.com' })
            .end((err, response) => {
                response.should.have.status(400);

                done();
            })
        })
    })

    describe('/POST User.Signup', () => {
        it('Gerando usuário com POST e nick repetido', (done) => {
            chai.request(uri)
            .post(path + '/user/signup')
            .send({ nick: 'rafa', email: 'rafael@gmail.com', phone: '5547999922229' })
            .end((err, response) => {
                response.should.have.status(400);

                done();
            })
        })        
    })

    describe('/POST User.signup', () => {
        it('Gerando usuário com POST e email repetido', (done) => {
            chai.request(uri)
            .post(path + '/user/signup')
            .send({ nick: 'roberto', email: 'rafael@gmail.com', phone: '5547999922229' })
            .end((err, response) => {
                response.should.have.status(400);

                done();
            })
        })
    })

    describe('/POST User.check', () => {
        it('Checando resposta de pergunta com POST e sem AUTH', (done) => {
            chai.request(uri)
            .post(path + '/user/check/1')
            .send({ id: 1, answer: 'b' })
            .end((err, response) => {
                response.should.have.status(401);

                done();
            })
        })
    })
});