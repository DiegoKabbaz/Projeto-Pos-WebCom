describe('Pesquisa e Visualização de Produtos - WebCom', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-PESQ-001: Pesquisa bem-sucedida por nome completo do produto', () => {
    // Acessar página de produtos
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Usar a barra de pesquisa
    cy.get('input#search_product').type('Blue Top');
    cy.get('button#submit_search').click();
    
    // Validar que os resultados são exibidos
    cy.get('div.productinfo').should('be.visible');
    cy.get('p:contains("Blue Top")').should('be.visible');
  });

  it('CT-PESQ-002: Pesquisa por termo parcial com múltiplos resultados', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Pesquisar por termo parcial
    cy.get('input#search_product').type('Shirt');
    cy.get('button#submit_search').click();
    
    // Validar que múltiplos produtos são exibidos
    cy.get('div.productinfo').should('have.length.greaterThan', 1);
  });

  it('CT-PESQ-003: Pesquisa por termo inexistente', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Pesquisar por termo que não existe
    cy.get('input#search_product').type('Notebook Gamer XYZ');
    cy.get('button#submit_search').click();
    
    // Validar mensagem de nenhum resultado
    cy.get('div.productinfo').should('not.exist');
  });

  it('CT-PESQ-004: Visualização detalhada do produto', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Clicar no primeiro produto
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Validar que a página de detalhes é exibida
    cy.get('div.product-details').should('be.visible');
    cy.get('h2').should('be.visible');
    cy.get('span.price').should('be.visible');
    cy.get('p').should('be.visible'); // Descrição
    
    // Validar opções de quantidade
    cy.get('input#quantity').should('be.visible');
  });

  it('CT-PESQ-005: Navegação entre categorias de produtos', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Validar que categorias estão visíveis
    cy.get('div.left-sidebar').should('be.visible');
    cy.get('div.category-products').should('be.visible');
  });

  it('CT-PESQ-006: Visualizar todos os produtos na página', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Validar que produtos são exibidos
    cy.get('div.productinfo').should('have.length.greaterThan', 0);
    
    // Validar que cada produto tem informações básicas
    cy.get('div.productinfo').each(($product) => {
      cy.wrap($product).find('p').should('be.visible');
      cy.wrap($product).find('a').should('be.visible');
    });
  });
});
