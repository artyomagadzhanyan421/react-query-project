describe('test posts component', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('checks my heading', () => {

    cy.get('[data-testid="posts-heading-test"]')

      // Testing existence and "have"
      .should('exist')
      .should('have.text', "JSON data:")

      // Testing with "contain"
      .should('contain.text', "JSON data:");
  });
})