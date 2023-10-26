/// <reference types="cypress" />
//Esse teste verifica se a página é carregada corretamente
//E se um botão específico pode ser clicado e exibe o valor "Obrigado!" após o clique.

describe('Entrar na Url', () => {
  it('Visitar pagina', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');

    cy.title().should('be.equal', 'Campo de Treinamento');
    cy.title().should('contain', 'Campo');

    cy.title().should('be.equal', 'Campo de Treinamento');
    cy.title().and('contain', 'Campo');
  });
  it('Apertar o elemento-butao', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.get('#buttonSimple').click().should('have.value', 'Obrigado!');
  });
  0;
});
