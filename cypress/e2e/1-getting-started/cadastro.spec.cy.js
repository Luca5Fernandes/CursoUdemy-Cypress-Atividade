/// <reference types="cypress" />
//Esse conjunto de testes verifica se o formulário lida corretamente com diferentes cenários de preenchimento
//Incluindo campos em branco e preenchimento completo
//Também verifica se as mensagens de alerta são exibidas conforme o esperado em cada situação

describe('Visitar', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });
  it('Cadastrar com erro', () => {
    cy.get('#formCadastrar').click();
  });
  cy.on('window:alert', (msg) => {
    expect(msg).to.be.equal('Nome eh obrigatorio');
  });
  it('Cadastrar com nome', () => {
    cy.get('#formNome').type('Jose');
    cy.get('#formCadastrar').click();
  });
  cy.on('window:alert', (msg) => {
    expect(msg).to.be.equal('Sobrenome eh obrigatorio');
  });

  it('Cadastrar sem genero', () => {
    cy.get('#formNome').type('Jose');
    cy.get('[data-cy="dataSobrenome"]').type('Silva');
    cy.get('#formCadastrar').click();
  });
  cy.on('window:alert', (msg) => {
    expect(msg).to.be.equal('Sexo eh obrigatorio');
  });

  it('Cadastro completo', () => {
    cy.get('#formNome').type('Jose');
    cy.get('[data-cy="dataSobrenome"]').type('Silva');
    cy.get('#formSexoMasc').click();
    cy.get('#formCadastrar').click();
  });
  cy.on('window:alert', (msg) => {
    expect(msg).to.be.equal('Sexo eh obrigatorio');
    cy.get('body').should('contain', 'Cadastrado!');
  });
});
