describe('test API states', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('checks my loading state', () => {
    cy.get('[data-testid="loading-state"]')
      .should('exist')
      .and('contain.text', 'Loading...');
  })
})