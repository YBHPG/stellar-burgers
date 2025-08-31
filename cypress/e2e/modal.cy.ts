describe('Проверка работы модального окна', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1300, 800);

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait('@getIngredients');
    cy.getCard().should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.getCard().first().click();
    cy.getModal().should('exist');
    cy.getModal().find('[data-cy="modal-close-button"]').click();
    cy.getModal().should('not.exist');
  });

  it('Закрытие модального окна ингредиента по оверлею', () => {
    cy.getCard().first().click();
    cy.getModal().should('exist');
    cy.dataCy('modal-overlay').click({ force: true });
    cy.getModal().should('not.exist');
  });
});
