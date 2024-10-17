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

  it('User cannot submit the login form with invalid credentials and is shown a message', () => {
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('invaliduser@example.com');
      cy.get('input[name="password"]').type('invalidPassword');
      cy.get('form').submit();
    });
    // You'll need to adjust this based on how your application shows error messages
    cy.contains('Invalid credentials').should('be.visible');
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
