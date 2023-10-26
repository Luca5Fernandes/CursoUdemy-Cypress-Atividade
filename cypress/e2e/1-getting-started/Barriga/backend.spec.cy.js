/// <reference types="cypress" />
//Este serve para realizar testes funcionais em um sistema de gerenciamento de contas
//Cobrindo a criação de contas, alterações, verificações de duplicatas e consulta de saldos
//O token de autenticação é obtido antes dos testes para garantir o acesso autorizado ao sistema
describe('Testar Nivel Funcional', () => {
  let token;

  before(() => {
    cy.getToken('lucasfernandespontes122@gmail.com', 'lucasfox22').then((tkn) => {
      token = tkn;
    });
  });

  beforeEach(() => {
    cy.resetRest();
  });

  it('Criar uma conta', () => {
    cy.request({
      url: 'https://barrigarest.wcaquino.me/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta via rest',
      },
    }).as('response');

    cy.get('@response').then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('nome', 'Conta via rest');
    });
  });

  it('Alterar uma conta', () => {
    cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/contas',
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: 'Conta para alterar',
      },
    }).then((res) => {
      cy.request({
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: 'conta alterada via rest',
        },
      }).as('response');
    });

    cy.get('@response').its('status').should('be.equal', 200);
  });
  it('Não deve criar uma conta com o mesmo nome', () => {
    cy.request({
      url: 'https://barrigarest.wcaquino.me/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta mesmo nome',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      console.log(res);
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!');
    });
  });
  it('Buscar saldo', () => {
    cy.request({
      url: 'https://barrigarest.wcaquino.me/saldo',
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
    }).then((res) => {
      let saldoConta = null;
      res.body.forEach((c) => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal('534.00');
    });
  });
});
