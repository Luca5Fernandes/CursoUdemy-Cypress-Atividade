/// <reference types="cypress" />
//Em resumo, este código usa o Cypress para realizar uma série de testes funcionais em um sistema da web
//Incluindo ações como login, inserção e alteração de contas, criação de transações e remoção de transações
//Cada teste verifica se as operações são bem - sucedidas e se as mensagens apropriadas são exibidas
import loc, { MESSAGE } from '../../../support/locators';
describe('Testar Nivel Funcional', () => {
  beforeEach(() => {
    cy.visit('http://barrigareact.wcaquino.me/');
    cy.get(loc.LOGIN.USER).type('lucasfernandespontes122@gmail.com');
    cy.get(loc.LOGIN.PASSWORD).type('lucasfox22');
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo');
  });

  it('Inserir uma Conta', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.get(loc.CONTAS.NOME).type('Conta de Teste');
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
    cy.get('[data-test="menu-settings"]').click();
    cy.get('[href="/reset"]').click();
  });

  it('Alterar uma Conta', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click();
    cy.get(loc.CONTAS.NOME).clear().type('Conta de Teste');
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!');
  });

  it('Inserir Conta Repetida', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.get(loc.CONTAS.NOME).type('Conta alterada');
    cy.get(loc.CONTAS.BTN_SALVAR).click();
  });

  it('Criar uma Transação', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
    cy.get(loc.MOVIMENTACAO.VALOR).type('123');
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter');
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada');
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'sucesso');
  });
  it('Pegar Transação', () => {
    console.log(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada'));
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00');
  });
  it('Remover uma Transação', () => {
    cy.get(loc.MENU.EXTRATO).click();
    cy.get(':nth-child(7) > .row > .col > [href="#"]').click();
    cy.get(loc.MESSAGE).should('contain', 'sucesso');
  });
});
