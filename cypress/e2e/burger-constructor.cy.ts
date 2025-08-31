describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1300, 800);

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait('@getIngredients');
    cy.getCard().should('exist');
  });

  it('Добавление булки и ингридиентов в конструктор', () => {
    cy.getCard('булка');

    cy.getCard('Биокотлета');

    cy.getCard('Соус');

    cy.dataCy('constructor-bun').should('contain.text', 'булка');
    cy.dataCy('constructor-ingredient').should('contain.text', 'Биокотлета');
    cy.dataCy('constructor-ingredient').should('contain.text', 'Соус');
  });
});
