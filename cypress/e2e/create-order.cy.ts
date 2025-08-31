const fakeAccessToken = 'fake-access-token';
const fakeRefreshToken = 'fake-refresh-token';

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1300, 800);

    cy.setCookie('accessToken', fakeAccessToken);
    window.localStorage.setItem('refreshToken', fakeRefreshToken);

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.wait(['@getUser', '@getIngredients']);
    cy.getCard().should('exist');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Добавление ингридиентов в конструктор и создание заказа', () => {
    cy.getCard('булка');

    cy.getCard('Биокотлета');

    cy.dataCy('constructor-bun').should('contain.text', 'булка');
    cy.dataCy('constructor-ingredient').should('contain.text', 'Биокотлета');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'orders.json'
    }).as('createOrder');
    cy.dataCy('constructor-order-button').click();
    cy.wait('@createOrder').then(({ response }) => {
      const orderNumber = response?.body.order.number;
      cy.getModal().should('exist');
      cy.dataCy('order-number').should('contain', orderNumber);
    });

    cy.getModal().find('[data-cy="modal-close-button"]').click();
    cy.getModal().should('not.exist');

    cy.dataCy('constructor-bun').should(
      'contain.text', 
      'Выберите булки'
    );
    cy.dataCy('constructor-ingredient').should(
      'contain.text',
      'Выберите начинку'
    );
  });
});
