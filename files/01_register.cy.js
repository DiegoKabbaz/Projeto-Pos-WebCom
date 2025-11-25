describe('Registro de Usuário - WebCom', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('CT-REG-001: Registro bem-sucedido com dados válidos', () => {
    // Gerar email único
    const uniqueEmail = `testuser${Date.now()}@webcom.com`;
    
    // Preencher formulário de registro
    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(uniqueEmail);
    cy.get('button[data-qa="signup-button"]').click();
    
    // Validar redirecionamento para formulário de informações adicionais
    cy.get('h2[data-qa="account-details"]').should('contain', 'ENTER ACCOUNT INFORMATION');
    
    // Preencher informações adicionais
    cy.get('input[data-qa="password"]').type('TestPassword123');
    cy.get('input[data-qa="first_name"]').type('Test');
    cy.get('input[data-qa="last_name"]').type('User');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('select[data-qa="country"]').select('United States');
    cy.get('input[data-qa="state"]').type('California');
    cy.get('input[data-qa="city"]').type('Los Angeles');
    cy.get('input[data-qa="zipcode"]').type('90001');
    cy.get('input[data-qa="mobile_number"]').type('1234567890');
    
    // Clicar no botão de criar conta
    cy.get('button[data-qa="create-account"]').click();
    
    // Validar mensagem de sucesso
    cy.get('h2[data-qa="account-created"]').should('contain', 'ACCOUNT CREATED!');
    cy.get('a[data-qa="continue-button"]').click();
    
    // Validar que o usuário está logado
    cy.get('a:contains("Logout")').should('be.visible');
  });

  it('CT-REG-002: Tentativa de registro com e-mail já cadastrado', () => {
    // Usar um email que já deve estar cadastrado no sistema
    cy.get('input[data-qa="signup-name"]').type('Another User');
    cy.get('input[data-qa="signup-email"]').type('testuser@webcom.com');
    cy.get('button[data-qa="signup-button"]').click();
    
    // Validar mensagem de erro
    cy.get('form[action="/signup"] p').should('contain', 'Email Address already exist!');
  });

  it('CT-REG-003: Tentativa de registro com senha inválida (menos de 6 caracteres)', () => {
    const uniqueEmail = `testuser${Date.now()}@webcom.com`;
    
    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(uniqueEmail);
    cy.get('button[data-qa="signup-button"]').click();
    
    // Preencher com senha curta
    cy.get('input[data-qa="password"]').type('123');
    cy.get('input[data-qa="first_name"]').type('Test');
    cy.get('input[data-qa="last_name"]').type('User');
    cy.get('input[data-qa="address"]').type('123 Test Street');
    cy.get('select[data-qa="country"]').select('United States');
    cy.get('input[data-qa="state"]').type('California');
    cy.get('input[data-qa="city"]').type('Los Angeles');
    cy.get('input[data-qa="zipcode"]').type('90001');
    cy.get('input[data-qa="mobile_number"]').type('1234567890');
    
    // Tentar criar conta
    cy.get('button[data-qa="create-account"]').click();
    
    // Validar que permanece na página ou exibe erro
    cy.get('input[data-qa="password"]').should('be.visible');
  });

  it('CT-REG-004: Tentativa de registro com campos obrigatórios vazios', () => {
    // Tentar clicar no botão sem preencher os campos
    cy.get('button[data-qa="signup-button"]').click();
    
    // Validar que o formulário não foi submetido
    cy.get('input[data-qa="signup-name"]').should('be.visible');
    cy.get('input[data-qa="signup-email"]').should('be.visible');
  });
});
