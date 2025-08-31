// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

Cypress.Commands.add('getCard', (value?: string) => {
  if (value) {
    return cy
      .get(`[data-cy="ingredient-card"]`)
      .contains(value)
      .parent()
      .find('[type="button"]')
      .click();
  }
  return cy.get(`[data-cy="ingredient-card"]`);
});

Cypress.Commands.add('getModal', () => {
  return cy.get(`[data-cy="modal"]`);
});

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getCard(value?: string): Chainable<JQuery<HTMLElement>>;
      getModal(): Chainable<JQuery<HTMLElement>>;
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
