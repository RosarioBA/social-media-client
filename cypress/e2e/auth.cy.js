describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('User can log in with the login form using valid credentials', () => {
    cy.get('button[data-bs-target="#loginModal"]').click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('validuser@noroff.no');
    cy.get('#loginPassword').type('validPassword123');
    cy.get('#loginForm').submit();
    cy.get('button[data-auth="logout"]').should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials and is shown a message', () => {
    cy.get('button[data-bs-target="#loginModal"]').click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('invaliduser@stud.noroff.no');
    cy.get('#loginPassword').type('invalidPassword');
    cy.get('#loginForm').submit();
    // Adjust this based on how your app shows error messages
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('User can log out with the logout button', () => {
    // First, log in
    cy.get('button[data-bs-target="#loginModal"]').click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginEmail').type('validuser@noroff.no');
    cy.get('#loginPassword').type('validPassword123');
    cy.get('#loginForm').submit();

    // Then, log out
    cy.get('button[data-auth="logout"]').click();
    cy.get('button[data-auth="login"]').should('be.visible');
  });
});
