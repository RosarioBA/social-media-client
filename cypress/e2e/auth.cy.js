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
    cy.wait(1000); // Wait for modals to fully close
  });

  const getLoginButton = () => {
    return cy.get('button[data-bs-target="#loginModal"][data-auth="login"]').first();
  };

  const openLoginModal = () => {
    getLoginButton().click({ force: true });
    cy.wait(1000); // Wait for 1 second after clicking
    cy.get('#loginModal #loginForm', { timeout: 10000 }).should('be.visible');
  };

  it('User can log in with the login form using valid credentials', () => {
    openLoginModal();
    cy.wait(1000); // Wait for modal to fully open
    cy.get('#loginForm')
      .should('be.visible')
      .within(($form) => {
        cy.get('input[name="email"]').type('rosario1999@stud.noroff.no', { delay: 100 });
        cy.get('input[name="password"]').type('rosario1999', { delay: 100 });
        cy.wait(1000); // Wait before submitting
        cy.wrap($form).submit();
      });
    cy.wait(5000); // Wait for login to complete
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
