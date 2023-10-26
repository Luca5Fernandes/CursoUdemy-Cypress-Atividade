/// <reference types="cypress" />
//Esse teste esta sendo usado para verificar a interação com iframes em uma página da web.
//iFrame é uma tag usada para inserir uma página HTML em outra.
describe('Trabalhar com iFrame', () => {
  it('Preencher campo de texto', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.get('#frame1').then((iframe) => {
      const body = iframe.contents().find('body');
      cy.wrap(body).find('#tfield').type('funciona?').should('have.value', 'funciona?');
    });
  });

  it('Frame diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html');
    cy.get('#otherButton').click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Click OK!');
    });
  });
});
