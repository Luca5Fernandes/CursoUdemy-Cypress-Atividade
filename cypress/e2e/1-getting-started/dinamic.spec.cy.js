/// <reference types="cypress" />
//Este código realiza testes de interação com elementos de um formulário
//Demonstrando diferentes técnicas, como a criação dinâmica de testes e a iteração sobre elementos
//Ele verifica se os elementos são preenchidos corretamente e se o resultado esperado é exibido após a submissão do formulário.
describe('Dinamic Test', () => {
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];
  foods.forEach((food) => {
    it(`Cadastro com Comida ${food}`, () => {
      cy.get('#formNome').type('Usuario');
      cy.get('#formSobrenome').type('Qualquer');
      cy.get(`[name=formSexo][value=F]`).click();
      cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click();
      cy.get('#formEscolaridade').select('Doutorado');
      cy.get('#formEsportes').select('Corrida');
      cy.get('#formCadastrar').click();
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
    });
  });

  it.only('Deve selecionar todos usando o Each ', () => {
    cy.get('#formNome').type('Usuario');
    cy.get('#formSobrenome').type('Qualquer');
    cy.get(`[name=formSexo][value=F]`).click();

    cy.get('[name=formComidaFavorita]').each(($el) => {
      cy.wrap($el).click();
    });

    cy.get('#formEscolaridade').select('Doutorado');
    cy.get('#formEsportes').select('Corrida');
    cy.get('#formCadastrar').click();
  });
});
