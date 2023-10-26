/// <reference types="cypress" />
//Esse teste serve para verificar se a interação com elementos básicos como
//texto, links, campos de formulário e etc funciona corretamente em uma aplicação web
describe('Trabalhar com Elementos Basicos', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  });
  it('Texto', () => {
    cy.get('body').should('contain', 'Cuidado');
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
  });
  it('Links', () => {
    cy.get('[href="#"]').click();
    cy.get('#resultado').should('have.text', 'Voltou!');
  });
  it('TextFilds', () => {
    cy.get('#formNome').type('Cypress Test').should('have.value', 'Cypress Test');

    cy.get('#elementosForm\\:sugestoes').type('TextArea').should('have.value', 'TextArea');

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('ola');

    cy.get('[data-cy="dataSobrenome"]').type('Teste123');
  });
  it('RadioButton', () => {
    cy.get('#formSexoFem').click().should('be.checked');

    cy.get('#formSexoMasc').should('not.be.checked');
  });
  it('Checkbox', () => {
    cy.get('#formComidaPizza').click().should('be.checked');

    cy.get('[name=formComidaFavorita]').click({ multiple: true });
    cy.get('#formComidaFavorita').should('not.be.checked');
    cy.get('#formComidaVegetariana').should('be.checked');
  });
  it('ComboList', () => {
    cy.get('[data-test="dataEscolaridade"]')
      .select('2o grau completo')
      .should('have.value', '2graucomp');
  });
  it('Combo multiplo', () => {
    cy.get('[data-testid="dataEsportes"]').select(['natacao', 'Corrida', 'nada']);
  });
});
