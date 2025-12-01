describe('Registro de Usuário - WebCom', () => {
  
  // Tratamento para ignorar erros de scripts de anúncios do Google
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('CT-REG-001: Registro bem-sucedido com dados válidos', () => {
    const uniqueEmail = `testuser${Date.now()}@webcom.com`;
    
    // Etapa 1: Signup
    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(uniqueEmail);
    cy.get('button[data-qa="signup-button"]').click();
    
    cy.contains('b', 'Enter Account Information').should('be.visible');
    
    // Etapa 2: Preencher dados
    cy.get('input[data-qa="password"]').type('TestPassword123');
    cy.get('input[data-qa="first_name"]').type('Test');
    cy.get('input[data-qa="last_name"]').type('User');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('select[data-qa="country"]').select('United States');
    cy.get('input[data-qa="state"]').type('California');
    cy.get('input[data-qa="city"]').type('Los Angeles');
    cy.get('input[data-qa="zipcode"]').type('90001');
    cy.get('input[data-qa="mobile_number"]').type('1234567890');
    
    cy.get('button[data-qa="create-account"]').click();
    
   
    cy.get('h2[data-qa="account-created"]').should('be.visible');
    cy.contains('Account Created!', { matchCase: false }).should('be.visible');
    
    cy.get('a[data-qa="continue-button"]').click();
    
    // Validar login
    cy.contains('Logout').should('be.visible');
  });

  it('CT-REG-002: Tentativa de registro com e-mail já cadastrado', () => {
    const emailDuplicado = 'usuario_duplicado_teste@webcom.com';

    // Pré-condição: Garantir que o email existe via API
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'Existing User',
        email: emailDuplicado,
        password: 'password123',
        title: 'Mr',
        birth_date: '01',
        birth_month: '01',
        birth_year: '2000',
        firstname: 'Exist',
        lastname: 'User',
        company: 'Test Corp',
        address1: 'Street Test',
        address2: 'Apt 1',
        country: 'United States',
        zipcode: '12345',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
      },
      failOnStatusCode: false
    });

    cy.get('input[data-qa="signup-name"]').type('Tentativa Duplicada');
    cy.get('input[data-qa="signup-email"]').type(emailDuplicado);
    cy.get('button[data-qa="signup-button"]').click();
    
    cy.contains('p', 'Email Address already exist!').should('be.visible');
  });

  it('CT-REG-003: Validação de Senha Curta (Comportamento do Site: Aceita)', () => {
    const uniqueEmail = `weakpass${Date.now()}@webcom.com`;
    
    cy.get('input[data-qa="signup-name"]').type('Test Weak Pass');
    cy.get('input[data-qa="signup-email"]').type(uniqueEmail);
    cy.get('button[data-qa="signup-button"]').click();
    
    cy.contains('b', 'Enter Account Information').should('be.visible');

    cy.get('input[data-qa="password"]').type('123'); // Senha curta
    
    cy.get('input[data-qa="first_name"]').type('Test');
    cy.get('input[data-qa="last_name"]').type('User');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('select[data-qa="country"]').select('United States');
    cy.get('input[data-qa="state"]').type('California');
    cy.get('input[data-qa="city"]').type('Los Angeles');
    cy.get('input[data-qa="zipcode"]').type('90001');
    cy.get('input[data-qa="mobile_number"]').type('1234567890');
    
    cy.get('button[data-qa="create-account"]').click();
    

    cy.get('h2[data-qa="account-created"]').should('be.visible');
    // Usamos 'Account Created!' (formato HTML) e matchCase false para garantir
    cy.contains('Account Created!', { matchCase: false }).should('be.visible');
    
    cy.log('AVISO: O site permitiu senha com menos de 6 caracteres.');
  });

  it('CT-REG-004: Tentativa de registro com campos obrigatórios vazios', () => {
    cy.get('button[data-qa="signup-button"]').click();
    
    // Verifica que ainda está na tela de login/signup (inputs visíveis)
    cy.get('input[data-qa="signup-name"]').should('be.visible');
    cy.get('input[data-qa="signup-email"]').should('be.visible');
  });
});