describe('Testes de API - Produtos', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  it('API-PROD-001: Listar todos os produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Validar status code
      expect(response.status).to.equal(200);
      
      // Validar estrutura da resposta
      expect(response.body).to.have.property('responseCode');
      expect(response.body.responseCode).to.equal(200);
      
      // Validar que há produtos na resposta
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
      expect(response.body.products.length).to.be.greaterThan(0);
      
      // Validar estrutura de um produto
      const product = response.body.products[0];
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('price');
    });
  });

  it('API-PROD-002: Buscar produto por ID', () => {
    // Primeiro, obter a lista de produtos
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
    }).then((response) => {
      const productId = response.body.products[0].id;
      
      // Buscar o produto específico
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/product/${productId}`,
      }).then((productResponse) => {
        expect(productResponse.status).to.equal(200);
        expect(productResponse.body).to.have.property('product');
        expect(productResponse.body.product).to.have.property('id', productId);
        expect(productResponse.body.product).to.have.property('name');
        expect(productResponse.body.product).to.have.property('price');
      });
    });
  });

  it('API-PROD-003: Buscar produto com ID inválido', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/product/99999`,
      failOnStatusCode: false
    }).then((response) => {
      // Validar que retorna erro
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('responseCode', 400);
    });
  });

  it('API-PROD-004: Pesquisar produtos por termo', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/productSearch`,
      body: {
        search_product: 'Shirt'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('responseCode', 200);
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
      
      // Validar que todos os produtos contêm o termo pesquisado
      response.body.products.forEach((product) => {
        expect(product.name.toLowerCase()).to.include('shirt');
      });
    });
  });

  it('API-PROD-005: Pesquisar com termo vazio', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/productSearch`,
      body: {
        search_product: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('responseCode', 400);
    });
  });

  it('API-PROD-006: Validar preços dos produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      response.body.products.forEach((product) => {
        // Validar que o preço é um número positivo
        expect(product.price).to.be.a('number');
        expect(product.price).to.be.greaterThan(0);
      });
    });
  });
});
