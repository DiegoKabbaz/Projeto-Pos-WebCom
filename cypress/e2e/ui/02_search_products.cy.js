describe('Pesquisa e Visualização de Produtos - WebCom', () => {
  
  // Bloqueio de erros de scripts de terceiros (Anúncios do Google)
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('CT-PESQ-001: Pesquisa bem-sucedida por nome completo do produto', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    cy.get('input#search_product').type('Blue Top');
    cy.get('button#submit_search').click();
    
    cy.get('div.productinfo').should('be.visible');
    // Busca pelo texto no parágrafo
    cy.contains('p', 'Blue Top').should('be.visible');
  });

  it('CT-PESQ-002: Pesquisa por termo parcial com múltiplos resultados', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    cy.get('input#search_product').type('Shirt');
    cy.get('button#submit_search').click();
    
    cy.get('div.productinfo').should('have.length.greaterThan', 1);
  });

  it('CT-PESQ-003: Pesquisa por termo inexistente', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    cy.get('input#search_product').type('Notebook Gamer XYZ');
    cy.get('button#submit_search').click();
    
    cy.get('div.productinfo').should('not.exist');
  });

  it('CT-PESQ-004: Visualização detalhada do produto', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    // Clicar no primeiro produto "View Product"
    cy.get('a[href*="/product_details/"]').first().click();
    
    // Validar elementos específicos da página de detalhes
    cy.get('.product-information').should('be.visible'); // Container principal
    cy.get('.product-information h2').should('be.visible'); // Nome do produto
    
    // O preço não tem classe 'price', então buscamos pelo símbolo da moeda 'Rs.'
    cy.contains('span', 'Rs.').should('be.visible');
    
    // Validar outras informações importantes
    cy.contains('p', 'Category:').should('be.visible');
    cy.contains('p', 'Availability:').should('be.visible');
    
    // Validar input de quantidade
    cy.get('input#quantity').should('be.visible');
  });

  it('CT-PESQ-005: Navegação entre categorias de produtos', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    cy.get('div.left-sidebar').should('be.visible');
    // Validar que o painel de categorias existe
    cy.get('#accordian').should('be.visible'); 
  });

  it('CT-PESQ-006: Visualizar todos os produtos na página', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    
    cy.get('div.productinfo').should('have.length.greaterThan', 0);
    
    // Usado o índice (index) do .each() para limitar a validação aos 3 primeiros
    cy.get('div.productinfo').each(($product, index) => {
      if (index < 3) {
        cy.wrap($product).find('p').should('be.visible');
        cy.wrap($product).find('a').should('be.visible');
      }
    });
  });
});