/// <reference types="cypress" />
//Este código serve para automatizar a interação com um prompt em uma página da web.
//Simula a entrada de texto no prompt e verifica se as mensagens de confirmação e alerta são as esperadas.
//Isso é útil para testar o comportamento da página quando um prompt é acionado.

describe('Trabalhar com alertas', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });
  beforeEach(() => {
    cy.reload();
  });

  it('Prompt', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('42');
    });
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Era 42?');
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal(':D');
    });
    cy.get('#prompt').click();
  });
});
