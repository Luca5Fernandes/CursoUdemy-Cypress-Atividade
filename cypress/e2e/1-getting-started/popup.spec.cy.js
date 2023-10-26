/// <reference types="cypress" />
//Esse teste esta sendo usado para verificar o comportamento de pop-ups num site, links e janelas do navegador em uma aplicação web.
//São usados para garantir que a aplicação se comporte conforme o esperado quando ocorrem ações de interação do usuário.
describe('Trabalhar com Popup', () => {
  it('Testar popup diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html');
    cy.get('#otherButton').click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Click OK!');
    });
  });
  it('Verificar se o popup foi invocado', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.window().then((win) => {
      cy.stub(win, 'open').as('winOpen');
    });
    cy.get('#buttonPopUp').click();
    cy.get('@winOpen').should('be.called');
  });
  describe('Com Links...', () => {
    beforeEach(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    it('Chegar popup url', () => {
      cy.contains('Popup2')
        .should('have.prop', 'href')
        .and('equal', 'https://wcaquino.me/cypress/frame.html');
    });
    it('Acessar popup dinamico', () => {
      cy.contains('Popup2').then(($a) => {
        const href = $a.prop('href');
        cy.visit(href);
      });
    });
    it('Forçar o link na mesma pagina', () => {
      cy.contains('Popup2').invoke('removeAttr', 'target').click();
      cy.get('#tfield').type('funciona');
    });
  });
});
