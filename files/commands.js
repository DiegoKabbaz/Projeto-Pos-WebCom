// Comando para fazer login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
  cy.url().should('include', '/');
});

// Comando para registrar um novo usuário
Cypress.Commands.add('registerUser', (userData) => {
  cy.visit('/login');
  cy.get('a[href="/login"]').parent().find('h2').contains('New User Signup!').should('be.visible');
  cy.get('input[data-qa="signup-name"]').type(userData.name);
  cy.get('input[data-qa="signup-email"]').type(userData.email);
  cy.get('button[data-qa="signup-button"]').click();
  
  // Preencher informações adicionais
  cy.get('input[data-qa="password"]').type(userData.password);
  cy.get('input[data-qa="first_name"]').type(userData.firstName);
  cy.get('input[data-qa="last_name"]').type(userData.lastName);
  cy.get('input[data-qa="address"]').type(userData.address);
  cy.get('select[data-qa="country"]').select(userData.country);
  cy.get('input[data-qa="state"]').type(userData.state);
  cy.get('input[data-qa="city"]').type(userData.city);
  cy.get('input[data-qa="zipcode"]').type(userData.zipcode);
  cy.get('input[data-qa="mobile_number"]').type(userData.phone);
  cy.get('button[data-qa="create-account"]').click();
});

// Comando para adicionar produto ao carrinho
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('a', 'Products').click();
  cy.contains('a', productName).parent().find('a[href*="product"]').click();
  cy.get('button[data-qa="quantity"]').clear().type('1');
  cy.get('button.btn.btn-default.cart').click();
  cy.get('button[data-dismiss="modal"]').click();
});

// Comando para visualizar carrinho
Cypress.Commands.add('viewCart', () => {
  cy.get('a[href="/view_cart"]').click();
});

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('a[href="/logout"]').click();
});
