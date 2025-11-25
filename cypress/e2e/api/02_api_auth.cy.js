describe('Testes de API - Autenticação e Usuários', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  it('API-AUTH-001: Criar usuário (Signup)', () => {
    const uniqueEmail = `testuser${Date.now()}@webcom.com`;
    
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerSignup`,
      body: {
        name: 'Test User',
        email: uniqueEmail,
        password: 'TestPassword123',
        title: 'Mr',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 1',
        country: 'United States',
        zipcode: '90001',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('responseCode');
      // Validar resposta (pode ser 201 para sucesso ou 400 se email já existe)
      expect([200, 201, 400]).to.include(response.body.responseCode);
    });
  });

  it('API-AUTH-002: Criar usuário com email duplicado', () => {
    const duplicateEmail = 'testuser@webcom.com';
    
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerSignup`,
      body: {
        name: 'Duplicate User',
        email: duplicateEmail,
        password: 'TestPassword123',
        title: 'Mr',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1990',
        firstname: 'Duplicate',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 1',
        country: 'United States',
        zipcode: '90001',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Validar que retorna erro para email duplicado
      expect(response.body).to.have.property('responseCode');
      expect([400, 401]).to.include(response.body.responseCode);
    });
  });

  it('API-AUTH-003: Criar usuário com dados incompletos', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerSignup`,
      body: {
        name: 'Incomplete User',
        email: `incomplete${Date.now()}@webcom.com'
        // Faltam outros campos obrigatórios
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('responseCode', 400);
    });
  });

  it('API-AUTH-004: Login de usuário', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerLogin`,
      body: {
        email: 'testuser@webcom.com',
        password: 'TestPassword123'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('responseCode');
      // Validar que há dados do usuário na resposta
      if (response.body.responseCode === 200) {
        expect(response.body).to.have.property('user');
      }
    });
  });

  it('API-AUTH-005: Login com senha incorreta', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerLogin`,
      body: {
        email: 'testuser@webcom.com',
        password: 'WrongPassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('responseCode', 401);
    });
  });

  it('API-AUTH-006: Login com email inexistente', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/customerLogin`,
      body: {
        email: 'nonexistent@webcom.com',
        password: 'AnyPassword123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('responseCode', 401);
    });
  });

  it('API-AUTH-007: Obter detalhes do usuário', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/userDetail`,
      qs: {
        email: 'testuser@webcom.com'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('email');
    });
  });
});
