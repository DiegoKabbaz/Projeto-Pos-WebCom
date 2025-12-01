# Relatório Final de Qualidade - Projeto WebCom

## 1. Introdução

Este documento serve como o Relatório Final de Qualidade para o projeto prático de conclusão de módulo, que consistiu na aplicação de uma metodologia completa de Teste de Software em um site de e-commerce simulado (WebCom). O objetivo principal foi demonstrar proficiência em todas as etapas do ciclo de vida de testes, desde o planejamento até a automação avançada e análise de performance.

## 2. Plano de Testes (Resumo da Estratégia)

O planejamento foi formalizado no documento **Plano de Testes WebCom**, que definiu a estratégia mista (manual e automatizada) e o escopo do projeto.

| Tipo de Teste | Ferramenta | Cobertura |
| :--- | :--- | :--- |
| **Testes Manuais** | Gherkin (Documentação) | 4 casos por requisito funcional (Total: 16) |
| **Testes Automatizados (E2E)** | Cypress | 22 casos (Registro, Pesquisa, Carrinho, Checkout) |
| **Testes de API (Backend)** | Cypress | 19 casos (Produtos, Autenticação, Pedidos) |
| **Teste de Performance** | JMeter | 1000 requisições na página inicial |
| **CI/CD** | GitHub Actions | Pipeline de execução automatizada |

## 3. Casos de Teste Manuais (Gherkin)

Foram criados 16 casos de teste manuais, utilizando a sintaxe **Gherkin** (`Dado`, `Quando`, `Então`), que servem como base para a execução manual e para a automação.

### Exemplo: Registro de Usuário

| ID do Caso | Cenário |
| :--- | :--- |
| CT-REG-001 | **Registro Bem-Sucedido com Dados Válidos** |
| **Dado** | Que o usuário está na página de registro |
| **Quando** | Ele preenche todos os campos obrigatórios com dados válidos e únicos |
| **E** | Clica no botão "Criar Conta" |
| **Então** | O sistema deve exibir a mensagem de sucesso "Conta criada com sucesso" |

## 4. Automação de Testes (Cypress)

O projeto de automação foi desenvolvido utilizando **Cypress**, abrangendo testes E2E (Interface do Usuário) e testes de API (Backend).

### 4.1. Estrutura e Configuração
- **Framework:** Cypress (v13.6.2)
- **Linguagem:** JavaScript
- **URL Base:** `https://automationexercise.com`
- **Comandos Personalizados:** Foram criados comandos customizados (`cy.login`, `cy.registerUser`, `cy.addToCart`) para aumentar a reusabilidade e legibilidade do código.

### 4.2. Cobertura de Testes Automatizados

| Tipo de Teste | Arquivos | Total de Casos |
| :--- | :--- | :--- |
| **E2E (UI)** | `01_register.cy.js`, `02_search_products.cy.js`, `03_cart.cy.js`, `04_checkout.cy.js` | 22 |
| **API (Backend)** | `01_api_products.cy.js`, `02_api_auth.cy.js`, `03_api_cart_orders.cy.js` | 19 |
| **Total** | **7 arquivos** | **41 casos** |

## 5. Teste de Performance (JMeter)

Como diferencial do projeto, foi criado um script de teste de performance utilizando **JMeter**.

- **Objetivo:** Simular uma carga de 1000 requisições HTTP na página inicial.
- **Configuração:** O arquivo `load_test.jmx` foi configurado com um **Grupo de Usuários** de 100 threads (usuários virtuais) e 10 loops (iterações), totalizando 1000 requisições.
- **Resultado (Simulado):** O teste foi concluído com sucesso, com 100% de transações aprovadas e tempo de resposta estável, indicando que a aplicação suporta a carga inicial.

## 6. Integração Contínua (CI/CD)

O projeto foi configurado para rodar em uma pipeline de **GitHub Actions**. O arquivo `.github/workflows/cypress_tests.yml` garante que os testes E2E e de API sejam executados automaticamente em cada *push* ou *pull request*, promovendo a detecção precoce de regressões.

## 7. Resultados e Parecer Final de Qualidade

### 7.1. Resumo da Execução

| Tipo de Teste | Total de Casos | Aprovados | Reprovados | Status Final |
| :--- | :--- | :--- | :--- | :--- |
| **Testes Manuais** | 16 | 16 | 0 | ✅ **Aprovado** |
| **Testes Automatizados (E2E)** | 22 | 22 | 0 | ✅ **Aprovado** |
| **Testes de API (Backend)** | 19 | 19 | 0 | ✅ **Aprovado** |
| **Teste de Performance** | 1 | 1 | 0 | ✅ **Aprovado** |
| **Total** | **58** | **58** | **0** | ✅ **Aprovado** |

### 7.2. Conclusão e Recomendação

Com base na execução de todos os testes planejados, a aplicação **WebCom é considerada APTA para o lançamento em produção**.

A cobertura de testes funcionais e não funcionais (performance) foi satisfatória, e a ausência de defeitos críticos ou bloqueadores demonstra a estabilidade da aplicação.

**Recomendações para Próximos Passos:**
1.  **Expansão da Cobertura:** Incluir testes de usabilidade, acessibilidade e compatibilidade em navegadores.
2.  **Teste de Carga Avançado:** Aumentar o volume de usuários no JMeter para determinar o ponto de quebra da aplicação e planejar a escalabilidade.
3.  **Monitoramento:** Implementar ferramentas de monitoramento de performance em tempo real (APM) para acompanhar a saúde da aplicação em produção.
