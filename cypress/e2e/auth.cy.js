describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('User can log in with the login form using valid credentials', () => {
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('validuser@noroff.no');
    cy.get('#loginPassword').type('validPassword123');
    cy.get('#loginForm').submit();

    // Check if the logout button is visible (indicating successful login)
    cy.get('button[data-auth="logout"]').first().should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials', () => {
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('invaliduser@example.com');
    cy.get('#loginPassword').type('invalidPassword');
    cy.get('#loginForm').submit();

    // The login modal should still be visible after failed login
    cy.get('#loginModal').should('be.visible');

    // The login button should still be visible
    cy.get('button[data-auth="login"]').first().should('be.visible');
  });

  it('User can log out with the logout button', () => {
    // First, log in
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('validuser@noroff.no');
    cy.get('#loginPassword').type('validPassword123');
    cy.get('#loginForm').submit();

    // Verify login was successful
    cy.get('button[data-auth="logout"]').first().should('be.visible');

    // Now, log out
    cy.get('button[data-auth="logout"]').first().click();

    // Verify logout was successful
    cy.get('button[data-auth="login"]').first().should('be.visible');
  });
});
