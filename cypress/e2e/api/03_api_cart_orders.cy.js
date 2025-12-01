describe('Testes de API - Marcas e Produtos', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  it('API-BRAND-001: Obter lista de todas as marcas', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/brandsList`, 
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 200);
      expect(body).to.have.property('brands');
      expect(body.brands).to.be.an('array');
      expect(body.brands.length).to.be.greaterThan(0);
    });
  });

  it('API-BRAND-002: Validar método não permitido em Marcas', () => {
    // Testamos o método PUT, que geralmente não é permitido para listar
    cy.request({
      method: 'PUT',
      url: `${apiBaseUrl}/brandsList`,
      failOnStatusCode: false
    }).then((response) => {
      let body = response.body;
      if (typeof body === 'string') {
        try {
           body = JSON.parse(body);
        } catch(e) {}
      }
      
      expect(response.status).to.equal(200);
      // A API retorna responseCode 405 (Method Not Allowed) dentro de um status 200
      expect(body).to.have.property('responseCode', 405);
      expect(body).to.have.property('message', 'This request method is not supported.');
    });
  });

  it('API-PROD-003: Validar estrutura de resposta de produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`, 
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      // Validar que cada produto tem os campos esperados (apenas os 5 primeiros)
      body.products.slice(0, 5).forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('price');
        expect(product).to.have.property('brand');
        expect(product).to.have.property('category');
      });
    });
  });

  it('API-PROD-004: Validar resposta com headers corretos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers['content-type']).to.satisfy((contentType) => {
        return contentType.includes('application/json') || contentType.includes('text/html');
      });
    });
  });

  // Nota: Essa API ignora parâmetros de paginação e retorna tudo,
  // mas o teste serve para garantir que o envio de parâmetros extras não quebra a API.
  it('API-PROD-005: Validar resiliência com parâmetros extras', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`,
      qs: {
        page: 1,
        limit: 10
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);
      
      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });

  it('API-PROD-006: Validar endpoint inexistente', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsListInvalid`, // URL propositalmente errada
      failOnStatusCode: false
    }).then((response) => {
      // Aqui esperamos o 404 real
      expect(response.status).to.equal(404);
    });
  });
});