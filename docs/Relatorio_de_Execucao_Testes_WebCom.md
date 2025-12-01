# Relatório de Execução de Testes - Projeto WebCom

## 1. Resumo da Execução

Este relatório apresenta os resultados consolidados da execução dos testes manuais e automatizados para o projeto WebCom, realizados entre **25/11/2025** e **01/12/2025**.

| Tipo de Teste | Total de Casos | Aprovados | Reprovados | Status Final |
| :--- | :--- | :--- | :--- | :--- |
| **Testes Manuais** | 16 | 16 | 0 | ✅ **Aprovado** |
| **Testes Automatizados (E2E)** | 22 | 22 | 0 | ✅ **Aprovado** |
| **Testes de API (Backend)** | 19 | 19 | 0 | ✅ **Aprovado** |
| **Teste de Performance** | 1 | 1 | 0 | ✅ **Aprovado** |
| **Total** | **58** | **58** | **0** | ✅ **Aprovado** |

**Conclusão Geral:** A aplicação foi aprovada em todos os cenários de teste. Nenhum defeito crítico ou bloqueador foi encontrado, indicando que o sistema está estável e atende aos requisitos funcionais.

## 2. Resultados dos Testes Manuais

Todos os 16 casos de teste manuais, cobrindo as funcionalidades de Registro, Pesquisa, Carrinho e Checkout, foram executados com sucesso. A aplicação se comportou conforme o esperado em todos os cenários.

| Funcionalidade | Casos Executados | Resultado |
| :--- | :--- | :--- |
| Registro de Usuário | 4 | ✅ Aprovado |
| Pesquisa e Visualização de Produtos | 4 | ✅ Aprovado |
| Adição de Itens ao Carrinho | 4 | ✅ Aprovado |
| Finalização da Compra | 4 | ✅ Aprovado |

## 3. Resultados dos Testes Automatizados (Cypress)

A suíte de testes automatizados foi executada com sucesso. Os resultados detalhados estão disponíveis nos artefatos da pipeline de CI/CD.

### 3.1. Testes End-to-End (E2E)

| Suíte de Teste (Arquivo) | Casos Executados | Resultado |
| :--- | :--- | :--- |
| `01_register.cy.js` | 4 | ✅ Aprovado |
| `02_search_products.cy.js` | 6 | ✅ Aprovado |
| `03_cart.cy.js` | 6 | ✅ Aprovado |
| `04_checkout.cy.js` | 6 | ✅ Aprovado |

### 3.2. Testes de API (Backend)

| Suíte de Teste (Arquivo) | Casos Executados | Resultado |
| :--- | :--- | :--- |
| `01_api_products.cy.js` | 6 | ✅ Aprovado |
| `02_api_auth.cy.js` | 7 | ✅ Aprovado |
| `03_api_cart_orders.cy.js` | 6 | ✅ Aprovado |

## 4. Resultados do Teste de Performance (JMeter)

O teste de carga foi executado com sucesso, simulando **1000 requisições** na página inicial do site.

- **Configuração:** 100 usuários virtuais, 10 iterações por usuário, com um tempo de inicialização de 10 segundos.
- **Resultado:** O servidor respondeu a todas as requisições com sucesso (código 200), sem apresentar erros. O tempo médio de resposta se manteve estável, indicando que a aplicação suporta a carga definida.

## 5. Defeitos Encontrados

Nenhum defeito foi encontrado durante a execução dos testes. Isso sugere uma boa qualidade de desenvolvimento e estabilidade da aplicação.

## 6. Parecer Final de Qualidade

Com base nos resultados obtidos, a aplicação **WebCom é considerada APTA para o lançamento em produção**.

- **Pontos Fortes:**
  - A aplicação é funcional e estável.
  - As APIs responderam corretamente e com bom desempenho.
  - O sistema suportou o teste de carga inicial sem degradação.

- **Recomendações:**
  - Expandir a cobertura de testes para incluir cenários de usabilidade e acessibilidade.
  - Aumentar a carga no teste de performance para identificar o ponto de quebra da aplicação.
  - Implementar um monitoramento contínuo em produção para garantir a estabilidade a longo prazo.
