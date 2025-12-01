# Plano de Testes - Projeto WebCom

## 1. Introdução

### 1.1. Visão Geral do Projeto
O projeto WebCom consiste em testar as funcionalidades de um site de e-commerce, conforme as diretrizes do módulo de conclusão. O foco é aplicar uma metodologia de testes abrangente, que inclui planejamento, criação de casos de teste, automação e análise de performance.

### 1.2. Objetivo do Plano de Testes
Este documento detalha a estratégia e o planejamento para validar a qualidade do site WebCom. O objetivo é identificar e relatar defeitos, garantir que os requisitos funcionais sejam atendidos e fornecer um parecer final sobre a viabilidade do produto.

## 2. Escopo dos Testes

### 2.1. Funcionalidades em Escopo
As seguintes funcionalidades serão testadas:
*   **Registro de Usuário:** Criação de nova conta.
*   **Pesquisa e Visualização de Produtos:** Busca por itens e acesso à página de detalhes.
*   **Adição de Itens ao Carrinho de Compras:** Inclusão e gestão de produtos no carrinho.
*   **Finalização da Compra:** Processo de checkout.
*   **Testes de API (Backend):** Validação da lógica de negócio no servidor.
*   **Teste de Performance (Carga):** Simulação de 1000 requisições na página inicial.

### 2.2. Fora do Escopo
*   Testes de usabilidade e acessibilidade.
*   Testes de compatibilidade em múltiplos navegadores e dispositivos (foco será no Chrome em ambiente desktop).
*   Testes de localização.
*   Funcionalidades não especificadas no documento (ex: painel de administração, recuperação de senha, etc.).

## 3. Estratégia de Testes

### 3.1. Abordagem
Será utilizada uma abordagem mista, combinando testes manuais e automatizados para garantir a cobertura e a eficiência.

### 3.2. Tipos de Teste e Ferramentas

| Tipo de Teste | Objetivo | Ferramenta | Cobertura Mínima |
| :--- | :--- | :--- | :--- |
| **Manuais** | Explorar a aplicação e validar a experiência do usuário. | Planilha (Markdown) | 4 casos de teste por requisito funcional. |
| **Automatizados (E2E)** | Garantir a regressão das funcionalidades críticas. | Cypress | 2 casos de teste por requisito funcional. |
| **Testes de API** | Validar a lógica de negócio no servidor. | Cypress | Mínimo de 2 testes de API. |
| **Teste de Performance** | Simular carga para verificar estabilidade. | JMeter | 1000 requisições HTTP. |
| **CI/CD** | Automatizar a execução dos testes em cada *push*. | GitHub Actions | Configuração de pipeline. |

## 4. Recursos e Cronograma

### 4.1. Papéis e Responsabilidades
*   **Analista de QA (Manus):** Responsável por planejar, projetar, executar e documentar todos os testes.

### 4.2. Cronograma (7 Dias)

| Dia | Fase | Atividades |
| :--- | :--- | :--- |
| **1** | Planejamento e Casos de Teste | Elaboração do Plano de Testes e criação dos Casos de Teste Manuais. |
| **2-3** | Automação (Cypress) | Configuração do ambiente e desenvolvimento dos scripts E2E e de API. |
| **4** | Performance e CI/CD | Criação do script JMeter e configuração da pipeline no GitHub Actions. |
| **5** | Execução e Análise | Execução de todos os testes (manuais e automatizados) e registro de defeitos. |
| **6-7** | Relatório Final | Elaboração do parecer final, consolidação de artefatos e entrega. |

## 5. Critérios de Entrada e Saída

### 5.1. Critérios de Entrada
*   Ambiente de teste (`automationexercise.com` e `automationpractice.pl`) disponível e acessível.
*   Requisitos do projeto claramente definidos.

### 5.2. Critérios de Saída
*   100% dos casos de teste (manuais e automatizados) executados.
*   Nenhum defeito crítico (bloqueador) em aberto.
*   Relatórios de execução e parecer final entregues.

## 6. Entregáveis
*   Documento do Plano de Testes.
*   Documento com os Casos de Teste Manuais (formato Gherkin).
*   Repositório no GitHub com o projeto de automação (Cypress) e o script JMeter.
*   Pipeline de CI/CD configurada.
*   Relatório de Execução dos Testes e Parecer Final.
