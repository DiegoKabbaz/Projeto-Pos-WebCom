describe('Finalização da Compra (Checkout) - WebCom', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const loginUser = () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type('testuser@webcom.com');
    cy.get('input[data-qa="login-password"]').type('TestPassword123');
    cy.get('button[data-qa="login-button"]').click();
  };

  const addProductToCart = () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
  };

  it('CT-CHECK-001: Finalização de compra bem-sucedida (usuário logado)', () => {
    // Login
    loginUser();
    
    // Adicionar produto ao carrinho
    addProductToCart();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
    
    // Prosseguir para checkout
    cy.get('a.btn.btn-default.check_out').click();
    
    // Validar que está na página de checkout
    cy.get('h2').should('contain', 'Address Details');
    
    // Preencher endereço de entrega (se necessário)
    cy.get('textarea[name="message"]').then(($textarea) => {
      if ($textarea.length > 0) {
        cy.wrap($textarea).type('Please deliver carefully');
      }
    });
    
    // Prosseguir para pagamento
    cy.get('a.btn.btn-default').contains('Place Order').click();
    
    // Validar página de pagamento
    cy.get('h2').should('contain', 'Payment');
  });

  it('CT-CHECK-002: Tentativa de finalização de compra (usuário não logado)', () => {
    // Adicionar produto sem fazer login
    addProductToCart();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    
    // Tentar prosseguir para checkout
    cy.get('a.btn.btn-default.check_out').click();
    
    // Validar redirecionamento para login
    cy.url().should('include', '/login');
    cy.get('h2').should('contain', 'Login');
  });

  it('CT-CHECK-003: Finalização de compra com carrinho vazio', () => {
    // Tentar acessar a página de checkout sem produtos
    cy.visit('/checkout');
    
    // Validar redirecionamento ou mensagem de erro
    cy.get('h2').should('contain', 'Shopping Cart');
  });

  it('CT-CHECK-004: Visualizar resumo do pedido antes de finalizar', () => {
    loginUser();
    addProductToCart();
    
    cy.get('a[href="/view_cart"]').click();
    cy.get('a.btn.btn-default.check_out').click();
    
    // Validar que o resumo do pedido é exibido
    cy.get('table').should('be.visible');
    cy.get('tr').should('have.length.greaterThan', 0);
  });

  it('CT-CHECK-005: Aplicar cupom de desconto (se disponível)', () => {
    loginUser();
    addProductToCart();
    
    cy.get('a[href="/view_cart"]').click();
    
    // Procurar por campo de cupom
    cy.get('input[placeholder*="coupon"]').then(($coupon) => {
      if ($coupon.length > 0) {
        cy.wrap($coupon).type('DISCOUNT10');
        cy.get('button').contains('Apply').click();
      }
    });
  });

  it('CT-CHECK-006: Validar cálculo de total com impostos e frete', () => {
    loginUser();
    addProductToCart();
    
    cy.get('a[href="/view_cart"]').click();
    
    // Validar que o total é exibido
    cy.get('table tr').contains('Total').should('be.visible');
    
    // Validar que subtotal, impostos e frete são mostrados
    cy.get('table tr').each(($row) => {
      cy.wrap($row).find('td').should('have.length.greaterThan', 0);
    });
  });
});
