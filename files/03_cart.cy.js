describe('Adição de Itens ao Carrinho - WebCom', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-CARR-001: Adicionar produto simples ao carrinho', () => {
    // Acessar página de produtos
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Clicar no primeiro produto
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Adicionar ao carrinho
    cy.get('button.btn.btn-default.cart').click();
    
    // Validar notificação de sucesso
    cy.get('div.modal-content').should('be.visible');
    cy.get('button[data-dismiss="modal"]').click();
    
    // Validar que o carrinho foi atualizado
    cy.get('a[href="/view_cart"]').should('be.visible');
  });

  it('CT-CARR-002: Adicionar múltiplas unidades do mesmo produto', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Clicar no primeiro produto
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Alterar quantidade
    cy.get('input#quantity').clear().type('3');
    cy.get('button.btn.btn-default.cart').click();
    
    // Validar modal de confirmação
    cy.get('div.modal-content').should('be.visible');
    cy.get('button[data-dismiss="modal"]').click();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
  });

  it('CT-CARR-003: Remover item do carrinho', () => {
    // Adicionar um produto ao carrinho
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
    
    // Remover o produto
    cy.get('a[class*="cart_quantity_delete"]').first().click();
    
    // Validar que o produto foi removido
    cy.get('div.cart_info').should('not.exist');
  });

  it('CT-CARR-004: Adicionar produtos diferentes ao carrinho', () => {
    // Adicionar primeiro produto
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // Voltar para produtos
    cy.get('a[href="/products"]').click();
    
    // Adicionar segundo produto
    cy.get('a[href*="/product_details/"]').eq(1).click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
    
    // Validar que ambos os produtos estão no carrinho
    cy.get('tr[id*="product"]').should('have.length', 2);
  });

  it('CT-CARR-005: Atualizar quantidade de produto no carrinho', () => {
    // Adicionar produto
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    
    // Alterar quantidade
    cy.get('input[class*="cart_quantity"]').first().clear().type('5');
    cy.get('a[class*="cart_quantity_up"]').first().click();
    
    // Validar que a quantidade foi atualizada
    cy.get('input[class*="cart_quantity"]').first().should('have.value', '5');
  });

  it('CT-CARR-006: Visualizar total do carrinho', () => {
    // Adicionar produto
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // Visualizar carrinho
    cy.get('a[href="/view_cart"]').click();
    
    // Validar que o total é exibido
    cy.get('tr').contains('Total').should('be.visible');
    cy.get('tr').contains('Total').find('td').last().should('contain', 'Rs.');
  });
});
