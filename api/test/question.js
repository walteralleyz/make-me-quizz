const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const uri = 'http://localhost:5000';
const path = '/api/v1';

describe('Pergunta', () => {
    describe('/GET Pergunta.Categorias', () => {
        it('Testando GET todos as Perguntas', (done) => {
            chai.request(uri)
            .get(path + '/question/categories')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');

                done();
            })
        })
    })

    describe('/GET Pergunta.Categorias', () => {
        it('Testando GET para unica pergunta sem auth', (done) => {
            chai.request(uri)
            .get(path + '/question/categories/geografia')
            .end((err, response) => {
                response.should.have.status(401);

                done();
            })
        })
    })

    describe('/Get Pergunta.Categorias', () => {
        it('Testando GET para unica pergunta com auth', (done) => {
            chai.request(uri)
            .get(path + '/question/categories/geografia')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk4Mzk3ODYwfQ.TlLtrnTx8xMuNhV4wPkIalezxzjvjDYHV0S7HRrYW10')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('result');

                done();
            })
        })
    })

    describe('/POST Pergunta.Categorias', () => {
        it('Testando POST para gerar pergunta sem auth', (done) => {
            chai.request(uri)
            .post(path + '/question/categories/filosofia')
            .end((err, response) => {
                response.should.have.status(401);

                done();
            })
        })
    })
});