describe('Adição de Itens ao Carrinho - WebCom', () => {
  
  // Ignorar erros de scripts de anúncios (Padrão para esse site)
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-CARR-001: Adicionar produto simples ao carrinho', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Clicar no primeiro produto "View Product"
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Adicionar ao carrinho
    cy.get('button.btn.btn-default.cart').click();
    
    // Validar notificação de sucesso e fechar modal
    cy.get('div.modal-content').should('be.visible');
    cy.get('button[data-dismiss="modal"]').click();
    
    // CORREÇÃO: Especificar que queremos o link do Menu Superior (.shop-menu)
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    cy.url().should('include', '/view_cart');
    cy.get('#cart_items').should('be.visible');
  });

  it('CT-CARR-002: Adicionar múltiplas unidades do mesmo produto', () => {
    cy.get('a[href="/products"]').click();
    
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Alterar quantidade para 3
    cy.get('input#quantity').clear().type('3');
    cy.get('button.btn.btn-default.cart').click();
    
    cy.get('div.modal-content').should('be.visible');
    cy.get('button[data-dismiss="modal"]').click();
    
    // CORREÇÃO: Clicar no link do menu
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Validar que a quantidade no carrinho é 3
    cy.get('tr[id*="product"]').find('button.disabled').should('contain', '3');
  });

  it('CT-CARR-003: Remover item do carrinho', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Remover o produto (botão X)
    cy.get('a.cart_quantity_delete').first().click();
    
    // Validar que a mensagem de carrinho vazio aparece ou o produto sumiu
    cy.get('#empty_cart').should('be.visible'); // Se for o único item, aparece mensagem de vazio
  });

  it('CT-CARR-004: Adicionar produtos diferentes ao carrinho', () => {
    // 1. Adicionar primeiro produto
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // 2. Voltar e adicionar segundo produto
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').eq(1).click(); // Segundo produto da lista
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    // 3. Ir para o carrinho
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Validar que existem 2 linhas de produtos
    cy.get('tr[id*="product"]').should('have.length', 2);
  });

  // REFORMULADO: O site não permite editar quantidade no carrinho, apenas visualizar.
  it('CT-CARR-005: Validar persistência da quantidade no carrinho', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Definimos 5 unidades NA TELA DO PRODUTO
    cy.get('input#quantity').clear().type('5');
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Validamos se o carrinho mostra 5
    cy.get('tr[id*="product"]').find('button.disabled').should('contain', '5');
  });

  it('CT-CARR-006: Visualizar total do carrinho', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href*="/product_details/"]').first().click();
    cy.get('button.btn.btn-default.cart').click();
    cy.get('button[data-dismiss="modal"]').click();
    
    cy.get('.shop-menu a[href="/view_cart"]').click();
    
    // Validar preços
    cy.get('.cart_price').should('contain', 'Rs.'); // Preço unitário
    cy.get('.cart_total_price').should('contain', 'Rs.'); // Preço total do item
  });
});