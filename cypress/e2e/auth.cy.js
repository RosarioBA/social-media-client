describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('User can log in with the login form using valid credentials', () => {
    // Open the login modal
    cy.get('button[data-auth="login"]').first().click();

    // Wait for the modal to be visible
    cy.get('#loginModal').should('be.visible');

    // Fill in the login form
    cy.get('#loginEmail').type('validuser@noroff.no');
    cy.get('#loginPassword').type('validPassword123');

    // Submit the form
    cy.get('#loginForm').submit();

    // Check if the logout button is visible (indicating successful login)
    cy.get('button[data-auth="logout"]').first().should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials and is shown an error message', () => {
    // Open the login modal
    cy.get('button[data-auth="login"]').first().click();

    // Wait for the modal to be visible
    cy.get('#loginModal').should('be.visible');

    // Fill in the login form with invalid credentials
    cy.get('#loginEmail').type('invaliduser@example.com');
    cy.get('#loginPassword').type('invalidPassword');

    // Submit the form
    cy.get('#loginForm').submit();

    // Check for an error message
    // Note: You'll need to add an error message element to your HTML and show it when login fails
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid credentials');
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
