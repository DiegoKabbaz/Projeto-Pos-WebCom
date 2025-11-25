# Projeto de Testes WebCom

Este projeto contém testes automatizados para o site de e-commerce WebCom, incluindo testes End-to-End (E2E), testes de API e testes de performance.

## Estrutura do Projeto

```
webcom_project/
├── cypress/
│   ├── e2e/
│   │   ├── api/              # Testes de API
│   │   └── ui/               # Testes de Interface do Usuário (E2E)
│   ├── fixtures/             # Dados de teste
│   └── support/              # Comandos e configurações personalizadas
├── cypress.config.js         # Configuração do Cypress
├── package.json              # Dependências do projeto
└── README.md                 # Este arquivo
```

## Instalação

1. **Clonar o repositório:**
   ```bash
   git clone <repository-url>
   cd webcom_project
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

## Uso

### Executar todos os testes
```bash
npm test
```

### Executar testes E2E
```bash
npm run test:e2e
```

### Executar testes de API
```bash
npm run test:api
```

### Abrir o Cypress interativamente
```bash
npm run test:open
```

### Executar testes com navegador visível
```bash
npm run test:headed
```

### Executar testes no Chrome
```bash
npm run test:chrome
```

## Testes Inclusos

### Testes E2E (UI)
- **Registro de Usuário:** Validação do fluxo de cadastro
- **Pesquisa de Produtos:** Busca e visualização de itens
- **Adição ao Carrinho:** Gerenciamento de produtos no carrinho
- **Finalização de Compra:** Processo de checkout

### Testes de API
- **Validação de Endpoints:** Testes de requisições HTTP
- **Validação de Respostas:** Verificação de dados retornados
- **Testes de Autenticação:** Validação de tokens e sessões

## Configuração

O arquivo `cypress.config.js` contém as configurações principais:
- **baseUrl:** URL base da aplicação (https://automationexercise.com)
- **viewportWidth/Height:** Dimensões da janela do navegador
- **defaultCommandTimeout:** Tempo limite para comandos
- **chromeWebSecurity:** Desabilita a segurança do Chrome para testes

## Dados de Teste

Os dados de teste estão localizados em `cypress/fixtures/testData.json` e incluem:
- Informações de usuários válidos e inválidos
- Nomes de produtos para testes
- Credenciais de teste

## Comandos Personalizados

Os seguintes comandos personalizados estão disponíveis:
- `cy.login(email, password)` - Fazer login
- `cy.registerUser(userData)` - Registrar novo usuário
- `cy.addToCart(productName)` - Adicionar produto ao carrinho
- `cy.viewCart()` - Visualizar carrinho
- `cy.logout()` - Fazer logout

## Relatórios

Após executar os testes, os relatórios são gerados em:
- `cypress/screenshots/` - Capturas de tela de falhas
- `cypress/videos/` - Vídeos dos testes (se configurado)

## CI/CD

Este projeto está configurado para rodar em GitHub Actions. Consulte `.github/workflows/` para detalhes.

## Autor

Manus AI - Projeto de Conclusão do Módulo de Testes de Software
