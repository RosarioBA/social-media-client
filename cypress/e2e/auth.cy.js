describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('User can log in with the login form using valid credentials', () => {
    // Open the login modal
    cy.get('button[data-auth="login"]').first().click();

    // Ensure modal is visible
    cy.get('#loginModal').should('be.visible');

    // Wait for any animations to complete
    cy.wait(300);

    // Fill in the login form
    cy.get('#loginEmail').should('be.visible').type('validuser@noroff.no', { force: true });
    cy.get('#loginPassword').should('be.visible').type('validPassword123', { force: true });

    // Submit the form
    cy.get('#loginForm').submit();

    // Check if the logout button is visible (indicating successful login)
    cy.get('button[data-auth="logout"]').first().should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials', () => {
    // Open the login modal
    cy.get('button[data-auth="login"]').first().click();

    // Ensure modal is visible
    cy.get('#loginModal').should('be.visible');

    // Wait for any animations to complete
    cy.wait(300);

    // Fill in the login form with invalid credentials
    cy.get('#loginEmail').should('be.visible').type('invaliduser@example.com', { force: true });
    cy.get('#loginPassword').should('be.visible').type('invalidPassword', { force: true });

    // Submit the form
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
    cy.wait(300);
    cy.get('#loginEmail').should('be.visible').type('validuser@noroff.no', { force: true });
    cy.get('#loginPassword').should('be.visible').type('validPassword123', { force: true });
    cy.get('#loginForm').submit();

    // Verify login was successful
    cy.get('button[data-auth="logout"]').first().should('be.visible');

    // Now, log out
    cy.get('button[data-auth="logout"]').first().click();

    // Verify logout was successful
    cy.get('button[data-auth="login"]').first().should('be.visible');
  });
});
