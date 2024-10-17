describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500'); // Make sure this URL is correct for your application
  });

  it('User can log in with the login form using valid credentials', () => {
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('validuser@noroff.no');
      cy.get('input[name="password"]').type('validPassword123');
      cy.get('form').submit();
    });
    cy.get('button[data-auth="logout"]').should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials and is shown an error message', () => {
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('invaliduser@example.com');
      cy.get('input[name="password"]').type('invalidPassword');
      cy.get('form').submit();
    });

    // Expect an error message on the page (adjust this selector to match your project)
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Either your username was not found or your password is incorrect');
  });

  it('User can log out with the logout button', () => {
    // First, log in
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('validuser@noroff.no');
      cy.get('input[name="password"]').type('validPassword123');
      cy.get('form').submit();
    });

    // Then, log out
    cy.get('button[data-auth="logout"]').click();
    cy.get('button[data-auth="login"]').should('be.visible');
  });
});
