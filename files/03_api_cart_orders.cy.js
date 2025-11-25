describe('Testes de API - Carrinho e Pedidos', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  it('API-CART-001: Obter lista de pedidos do usuário', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/userOrders`,
      qs: {
        email: 'testuser@webcom.com'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('responseCode');
      // Validar que há uma lista de pedidos (pode estar vazia)
      if (response.body.responseCode === 200) {
        expect(response.body).to.have.property('orders');
        expect(response.body.orders).to.be.an('array');
      }
    });
  });

  it('API-CART-002: Obter detalhes de um pedido específico', () => {
    // Primeiro, obter lista de pedidos
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/userOrders`,
      qs: {
        email: 'testuser@webcom.com'
      }
    }).then((response) => {
      if (response.body.orders && response.body.orders.length > 0) {
        const orderId = response.body.orders[0].id;
        
        // Obter detalhes do pedido
        cy.request({
          method: 'GET',
          url: `${apiBaseUrl}/orderDetails`,
          qs: {
            order_id: orderId
          }
        }).then((orderResponse) => {
          expect(orderResponse.status).to.equal(200);
          expect(orderResponse.body).to.have.property('order');
          expect(orderResponse.body.order).to.have.property('id', orderId);
        });
      }
    });
  });

  it('API-CART-003: Validar estrutura de resposta de produtos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      // Validar que cada produto tem os campos esperados
      response.body.products.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('price');
        expect(product).to.have.property('brand');
        expect(product).to.have.property('category');
      });
    });
  });

  it('API-CART-004: Validar resposta com headers corretos', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('API-CART-005: Validar paginação de produtos (se disponível)', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
      qs: {
        page: 1
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
    });
  });

  it('API-CART-006: Validar resposta para página inválida', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/productList`,
      qs: {
        page: 9999
      },
      failOnStatusCode: false
    }).then((response) => {
      // Pode retornar 200 com lista vazia ou 400
      expect([200, 400]).to.include(response.status);
    });
  });
});
