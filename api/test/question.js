const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const uri = 'http://localhost:5000';
const path = '/api/v1';
const authTest = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk4NDcwNTYxfQ.5z0_ezPFmRj2ntRn_kSzOLtldl9-mLPk7EjyYfhGR08';

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
            .set('Authorization', authTest)
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

    describe('/POST Pergunta.Categorias', () => {
        it('Testando POST para gerar pergunta com auth', (done) => {
            chai.request(uri)
            .post(path + '/question/categories/filosofia')
            .set('Authorization', authTest)
            .send({
                pergunta: 'De quem é a famosa frase “Penso, logo existo”?',
                escolhas: {
                    a: 'Platão',
                    b: 'Galileu Galilei',
                    c: 'Descartes',
                    e: 'Sócrates',
                    f: 'Francis Bacon'
                },

                resposta: 'c'
            })
            .end((err, response) => {
                response.should.have.status(200);
                response.should.have.property('result');
                done();
            })
        })
    })
});