/// <reference types="cypress" />
//Esse teste mostra diferentes técnicas para esperar por elementos na página
//Essas práticas são úteis para lidar com elementos que podem não estar disponíveis imediatamente na página
//ou que podem exigir ações e espera até que estejam prontos para interação
describe('Esperas.....', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });
  beforeEach(() => {
    cy.reload();
  });
  it('Aguardar o Elemento esta Disponivel', () => {
    cy.get('#novoCampo').should('not.exist');
    cy.get('#buttonDelay').click();
    cy.get('#novoCampo').should('not.exist');
    cy.get('#novoCampo').should('exist');
    cy.get('#novoCampo').type('funciona');
  });
  it('Fazer retrys', () => {
    cy.get('#novoCampo').should('not.exist');
    cy.get('#buttonDelay').click();
    cy.get('#novoCampo').should('not.exist');
    cy.get('#novoCampo').should('exist').type('funciona');
  });
  it('Uso do find', () => {
    cy.get('#buttonList').click();
    cy.get('#lista li').find('span').should('contain', 'Item 1');

    cy.get('#lista li span').should('contain', 'Item 2');
  });
  it('Clik retry', () => {
    cy.get('#buttonCount').click().click().should('have.value', '111');
  });
});
