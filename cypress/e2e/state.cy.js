describe('test API states', () => {
  it('checks the loading state', () => {
    cy.intercept('GET', 'http://localhost:3001/data', (req) => {
      req.on('response', (res) => {
        res.setDelay(100); // simulate a delay to show loading
      });
    }).as('getData');

    cy.visit('/');

    cy.get('[data-testid="loading-state"]')
      .should('exist')
      .and('contain.text', 'Loading...');
  });

  // it('checks the error state', () => {
  //   cy.intercept('GET', 'http://localhost:3001/data', {
  //     statusCode: 500,
  //     body: {},
  //   }).as('getError');

  //   cy.visit('/');

  //   cy.get('[data-testid="error-state"]')
  //     .should('exist')
  //     .and('contain.text', 'Error fetching recipes.');
  // });
})