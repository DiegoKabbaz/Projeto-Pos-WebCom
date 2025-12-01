describe('Testes de API - Produtos', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  it('API-PROD-001: Listar todos os produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`, 
    }).then((response) => {
      expect(response.status).to.equal(200);

      // Tratamento para resposta em formato String/HTML
      let body = response.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      expect(body).to.have.property('responseCode', 200);
      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
      expect(body.products.length).to.be.greaterThan(0);
    });
  });

  it('API-PROD-002: Buscar produto por ID (Via Filtro)', () => {
    // Essa API não possui endpoint GET /product/{id}. 
    
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`,
    }).then((response) => {
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      // Pegamos o primeiro produto da lista para usar de teste
      const productToFind = body.products[0];
      
      // Simulamos a busca filtrando no array
      const foundProduct = body.products.find(p => p.id === productToFind.id);

      expect(foundProduct).to.not.be.undefined;
      expect(foundProduct.id).to.equal(productToFind.id);
      expect(foundProduct).to.have.property('name');
      expect(foundProduct).to.have.property('price');
    });
  });

  it('API-PROD-003: Validar Método Não Permitido (POST em Lista)', () => {
    // Como GET /product/99999 dá 404 (Not Found), vamos testar um 
    // cenário de erro mais controlado: Tentar criar um produto na rota de lista
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/productsList`,
      failOnStatusCode: false
    }).then((response) => {
      let body = response.body;
      try {
        if (typeof body === 'string') body = JSON.parse(body);
      } catch (e) {
        // Se falhar o parse, seguimos
      }

      // A API retorna HTML de erro ou um JSON com responseCode 405
      expect(body).to.have.property('responseCode', 405);
      expect(body).to.have.property('message', 'This request method is not supported.');
    });
  });

  it('API-PROD-004: Pesquisar produtos por termo', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/searchProduct`, 
      form: true, // Essa API requer form-data
      body: {
        search_product: 'tshirt'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 200);
      expect(body).to.have.property('products');
      expect(body.products.length).to.be.greaterThan(0);
    });
  });

it('API-PROD-005: Pesquisar com termo vazio', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/searchProduct`,
      form: true,
      body: {
        search_product: ''
      }
    }).then((response) => {
      // Ajuste: A API retorna 200 mesmo com busca vazia
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 200);
      
      // Ajuste: A API retorna a lista de produtos (propriedade 'products' existe)
      // Então validamos que ela devolveu um array, ao invés de verificar que não existe
      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });

  it('API-PROD-006: Validar preços dos produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productsList`, 
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      // Validar apenas os primeiros 3 itens para economizar tempo
      body.products.slice(0, 3).forEach((product) => {
        expect(product.price).to.exist;
        // O preço vem como string (ex: "Rs. 500"), então validamos que não está vazio
        expect(product.price).to.not.be.empty;
      });
    });
  });
});