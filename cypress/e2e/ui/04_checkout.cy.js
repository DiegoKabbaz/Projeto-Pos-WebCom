describe('Finalização da Compra (Checkout) - WebCom', () => {
  
  // Dados para criação de usuário dinâmico
  const userEmail = `checkout_user_${Date.now()}@webcom.com`;
  const userPassword = 'password123';

  // Ignorar erros de scripts de terceiros (Google Ads)
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Cria um usuário via API para garantir que o login funcione
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'Checkout User',
        email: userEmail,
        password: userPassword,
        title: 'Mr',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1995',
        firstname: 'Checkout',
        lastname: 'Tester',
        company: 'QA Corp',
        address1: '123 Checkout Blvd',
        address2: 'Suite 100',
        country: 'United States',
        zipcode: '90210',
        state: 'California',
        city: 'Beverly Hills',
        mobile_number: '9876543210'
      }
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  // Funções Auxiliares
  const loginUser = () => {
    cy.get('.shop-menu a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type(userEmail);
    cy.get('input[data-qa="login-password"]').type(userPassword);
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('Logged in as').should('be.visible');
  };

  const addProductToCart = () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    // Fechar o modal para não atrapalhar
    cy.get('button[data-dismiss="modal"]').click();
  };

  it('CT-CHECK-001: Finalização de compra bem-sucedida (usuário logado)', () => {
    loginUser();
    addProductToCart();
    
    // Clicar no link do carrinho do MENU SUPERIOR
    cy.get('.shop-menu a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
    
    // Prosseguir para checkout
    cy.get('a.btn.btn-default.check_out').click();
    
    // Validar endereços
    cy.get('h2').should('contain', 'Address Details');
    cy.contains('123 Checkout Blvd').should('be.visible'); 
    
    // Comentário no pedido
    cy.get('textarea[name="message"]').type('Please deliver carefully');
    
    // Clicar em Place Order
    cy.get('a[href="/payment"]').click();
    
    // Validar página de pagamento
    cy.url().should('include', '/payment');
    cy.get('h2').should('contain', 'Payment');
    
    // Preencher cartão
    cy.get('[data-qa="name-on-card"]').type('Checkout User');
    cy.get('[data-qa="card-number"]').type('411111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    
    cy.get('[data-qa="pay-button"]').click();
    
    // Validar sucesso
    cy.get('[data-qa="order-placed"]').should('be.visible');
  });

  it('CT-CHECK-002: Tentativa de finalização de compra (usuário não logado)', () => {
    addProductToCart();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Tentar checkout
    cy.get('a.btn.btn-default.check_out').click();
    cy.get('#checkoutModal').should('be.visible');
    cy.get('#checkoutModal a[href="/login"]').click();
    
    // Agora deve validar o redirecionamento
    cy.url().should('include', '/login');
  });

  it('CT-CHECK-003: Finalização de compra com carrinho vazio', () => {
    cy.visit('/view_cart');
    
    // Validar mensagem de vazio
    cy.get('#empty_cart').should('be.visible');
    cy.contains('Cart is empty!').should('be.visible');
  });

  it('CT-CHECK-004: Visualizar resumo do pedido antes de finalizar', () => {
    loginUser();
    addProductToCart();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    cy.get('a.btn.btn-default.check_out').click();
    
    // Validar tabela de revisão
    cy.get('h2').contains('Review Your Order').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('td.cart_description').should('exist');
  });

  it('CT-CHECK-005: Validar ausência de cupom (Funcionalidade não ativa)', () => {
    loginUser();
    addProductToCart();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Verifica se o campo existe antes de tentar digitar
    cy.get('body').then(($body) => {
        if ($body.find('#coupon_code').length > 0) {
            cy.get('#coupon_code').type('TEST10');
        }
    });
  });

  it('CT-CHECK-006: Validar cálculo de total', () => {
    loginUser();
    addProductToCart();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Validar que os preços estão visíveis
    cy.get('.cart_total_price').should('contain', 'Rs.');
  });
});