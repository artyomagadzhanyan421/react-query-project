describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="posts-heading-test"]')
      .should('exist')
      .should('have.text', "JSON data:");
  })
})