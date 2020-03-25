
<<<<<<< HEAD
describe('The first test', function() {
    it('Should load the homepage', function() {
      cy.visit('http://localhost:8000/')
=======
describe('The first test', ()=> {
    it('Should load the homepage', ()=> {
      cy.visit('http://localhost:8000/')

      cy.contains('Produkter').click()

      cy.url().should('include', '/allproducts')

      cy.contains('Lägg i varukorg')

>>>>>>> 5cb1de28494d67e01670b012472fcdbbdcae799d
    })
  })