/// <reference types="cypress" />
//Este código serve para automatizar a interação com alertas e diálogos
//O uso de stubs que permite simular o comportamento do navegador para testar a interação do usuário.
describe('Trabalhar com Alertas', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });
  beforeEach(() => {
    cy.reload();
  });
  it('Alerta com mock', () => {
    const stub = cy.stub().as('aleta');
    cy.on('window:alert', stub);
    cy.get('#alert')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Alert Simples');
      });
  });
  it('Confirm', () => {
    cy.get('#confirm').click();
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Confirm Simples');
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Confirmado');
    });
  });
  it('Deny', () => {
    cy.get('#confirm').click();
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Confirm Simples');
      return false;
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Negado');
    });
  });
});
