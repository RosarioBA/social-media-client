describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window()
      .should('have.property', 'bootstrap')
      .then((bootstrap) => {
        // Force close all modals
        cy.get('.modal').each(($modal) => {
          bootstrap.Modal.getInstance($modal[0])?.hide();
        });
      });
    cy.get('.modal').should('not.be.visible');
    cy.wait(500); // Reduced from 1000ms to 500ms
  });

  const getLoginButton = () => {
    return cy.get('button[data-bs-target="#loginModal"][data-auth="login"]').first();
  };

  const openLoginModal = () => {
    getLoginButton().click({ force: true });
    cy.wait(500); // Reduced from 1000ms to 500ms
    cy.get('#loginModal #loginForm', { timeout: 10000 }).should('be.visible');
  };

  it('User can log in with the login form using valid credentials', () => {
    openLoginModal();
    cy.wait(500); // Reduced from 1000ms to 500ms
    cy.get('#loginForm')
      .should('be.visible')
      .within(($form) => {
        cy.get('input[name="email"]').type('rosario1999@stud.noroff.no');
        cy.get('input[name="password"]').type('rosario1999');
        cy.wrap($form).submit();
      });
    cy.wait(2000); // Reduced from 5000ms to 2000ms - keep some wait time for login
    cy.get('button[data-auth="logout"]', { timeout: 10000 }).should('be.visible');
  });

  it('User cannot submit the login form with invalid credentials and is shown a message', () => {
    openLoginModal();
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('invaliduser@example.com');
      cy.get('input[name="password"]').type('invalidPassword');
      cy.get('form').submit();
    });
    // Check for the alert message
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Either your username was not found or your password is incorrect');
    });
  });

  it('User can log out with the logout button', () => {
    // First, log in
    openLoginModal();
    cy.get('#loginModal').within(() => {
      cy.get('input[name="email"]').type('rosario1999@stud.noroff.no');
      cy.get('input[name="password"]').type('rosario1999');
      cy.get('form').submit();
    });

    // Then, log out
    cy.get('button[data-auth="logout"]').should('be.visible').click();
    cy.get('button[data-auth="login"]').should('be.visible');
  });
});
