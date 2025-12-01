describe('Testes de API - Autenticação e Usuários', () => {
  const apiBaseUrl = 'https://automationexercise.com/api';

  // Variável para armazenar email criado e usar no login depois
  let createdEmail = `testuser${Date.now()}@webcom.com`;
  const defaultPassword = 'TestPassword123';

  it('API-AUTH-001: Criar usuário (Signup)', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/createAccount`, 
      form: true, 
      body: {
        name: 'Test User',
        email: createdEmail,
        password: defaultPassword,
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
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 201);
      expect(body).to.have.property('message', 'User created!');
    });
  });

  it('API-AUTH-002: Criar usuário com email duplicado', () => {
    // Tentamos criar o MESMO usuário do teste anterior
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/createAccount`,
      form: true,
      body: {
        name: 'Duplicate User',
        email: createdEmail, // Email já usado acima
        password: defaultPassword,
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
      expect(response.status).to.equal(200); // API retorna 200 mesmo no erro, mas com message diferente
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body.responseCode).to.not.equal(201);
      // A mensagem geralmente é "Email already exists!"
      expect(body.message).to.include('exist');
    });
  });

  it('API-AUTH-003: Criar usuário com dados incompletos', () => {
    
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/createAccount`,
      form: true,
      body: {
        name: 'Incomplete User',
        email: `incomplete${Date.now()}@webcom.com` 
      },
      failOnStatusCode: false
    }).then((response) => {
       // Essa API as vezes retorna 200 com código de erro, ou 400.
       // Vamos garantir que não foi criado (não é 201)
       expect(response.status).to.be.oneOf([200, 400]);

       let body = response.body;
       if (typeof body === 'string') body = JSON.parse(body);
       
       if(body.responseCode) {
         expect(body.responseCode).to.not.equal(201);
       }
    });
  });

  it('API-AUTH-004: Login de usuário (Correto)', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/verifyLogin`, 
      form: true,
      body: {
        email: createdEmail, 
        password: defaultPassword
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 200);
      expect(body).to.have.property('message', 'User exists!');
    });
  });

  it('API-AUTH-005: Login com senha incorreta', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/verifyLogin`,
      form: true,
      body: {
        email: createdEmail,
        password: 'WrongPassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200); // API retorna 200
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 404);
      expect(body).to.have.property('message', 'User not found!');
    });
  });

  it('API-AUTH-006: Login com email inexistente', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/verifyLogin`,
      form: true,
      body: {
        email: 'nonexistent_random_email@webcom.com',
        password: 'AnyPassword123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 404);
      expect(body).to.have.property('message', 'User not found!');
    });
  });

  it('API-AUTH-007: Obter detalhes do usuário por Email', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/getUserDetailByEmail`, 
      qs: {
        email: createdEmail 
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      
      let body = response.body;
      if (typeof body === 'string') body = JSON.parse(body);

      expect(body).to.have.property('responseCode', 200);
      expect(body).to.have.property('user');
      expect(body.user).to.have.property('email', createdEmail);
    });
  });
});