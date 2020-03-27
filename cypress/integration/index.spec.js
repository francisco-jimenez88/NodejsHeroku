
describe('The first test', () => {
  it('Should load the homepage', () => {
    cy.visit('http://localhost:8000/');

    cy.contains('Produkter').click();

    cy.url().should('include', '/allproducts');

    cy.contains('Lägg i varukorg');
  });
});