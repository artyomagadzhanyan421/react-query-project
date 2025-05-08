describe('Recipe CRUD Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should fetch and display recipes (GET)', () => {
    cy.get('ul > li').should('exist');
  });

  it('should add a new recipe (POST)', () => {
    cy.get('[data-testid="title-input"]').type('Test Recipe');
    cy.get('[data-testid="cuisine-input"]').type('Test Cuisine');
    cy.get('[data-testid="time-input"]').type('30 mins');
    cy.get('[data-testid="add-recipe-button"]').click();

    cy.contains('Test Recipe').should('exist');
  });

  it('should delete a recipe (DELETE)', () => {
    cy.get('ul > li').first().within(() => {
      cy.get('button').click();
    });
  });
});