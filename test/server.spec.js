

const mocha = require('mocha');
const request = require('supertest')
const  server  = require('../router/router')

describe('Using express', ()=> {

    // vad som ska göras innan alla test körs
    // Det är här vi ska hämta servern och initiera
    beforeEach(()=> {
        const  server  = require('../router/router')
    })

    // ett test
    it('Should respond to /', (done)=> {
        request(server)
            .get('/')
            .expect(200, done)
    })

    // ett tredje test
    it('Should do 200 on /allproducts', (done)=> {
        request(server)
            .get('/allproducts')
            .expect(200, done)
    })

    // vad som ka göras efter alla test är färdigkörda
    // Det är här vi ska stänga servern
    afterEach(()=> {
        server.close()
    })
})