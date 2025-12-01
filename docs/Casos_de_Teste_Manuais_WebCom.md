# Casos de Teste Manuais - Projeto WebCom

Os casos de teste a seguir estão escritos no formato Gherkin (Feature, Scenario, Given, When, Then) para facilitar a compreensão e a futura automação.

## 1. Registro de Usuário

**Feature:** Registro de Novo Usuário

| ID do Caso | Cenário |
| :--- | :--- |
| CT-REG-001 | **Registro Bem-Sucedido com Dados Válidos** |
| **Dado** | Que o usuário está na página de registro |
| **Quando** | Ele preenche todos os campos obrigatórios com dados válidos e únicos |
| **E** | Clica no botão "Criar Conta" |
| **Então** | O sistema deve exibir a mensagem de sucesso "Conta criada com sucesso" |
| **E** | O usuário deve ser redirecionado para a página inicial logado |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-REG-002 | **Tentativa de Registro com E-mail Já Cadastrado** |
| **Dado** | Que o usuário está na página de registro |
| **E** | Que o e-mail "teste@webcom.com" já está cadastrado |
| **Quando** | Ele preenche o formulário com dados válidos, mas usa o e-mail "teste@webcom.com" |
| **E** | Clica no botão "Criar Conta" |
| **Então** | O sistema deve exibir uma mensagem de erro "E-mail já registrado" |
| **E** | O usuário deve permanecer na página de registro |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-REG-003 | **Tentativa de Registro com Senha Inválida (Menos de 6 caracteres)** |
| **Dado** | Que o usuário está na página de registro |
| **Quando** | Ele preenche o formulário com dados válidos, mas a senha tem apenas 5 caracteres |
| **E** | Clica no botão "Criar Conta" |
| **Então** | O sistema deve exibir uma mensagem de erro "A senha deve ter no mínimo 6 caracteres" |
| **E** | O usuário deve permanecer na página de registro |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-REG-004 | **Tentativa de Registro com Campos Obrigatórios Vazios** |
| **Dado** | Que o usuário está na página de registro |
| **Quando** | Ele clica no botão "Criar Conta" sem preencher o campo "Nome" |
| **Então** | O sistema deve exibir uma mensagem de erro de validação no campo "Nome" |
| **E** | O usuário deve permanecer na página de registro |

## 2. Pesquisa e Visualização de Produtos

**Feature:** Pesquisa e Visualização de Produtos

| ID do Caso | Cenário |
| :--- | :--- |
| CT-PESQ-001 | **Pesquisa Bem-Sucedida por Nome Completo do Produto** |
| **Dado** | Que o usuário está na página inicial |
| **Quando** | Ele digita o nome exato de um produto existente (ex: "Blue Top") na barra de pesquisa |
| **E** | Clica no botão "Pesquisar" |
| **Então** | A página de resultados deve ser exibida |
| **E** | Apenas o produto "Blue Top" deve ser listado |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-PESQ-002 | **Pesquisa por Termo Parcial com Múltiplos Resultados** |
| **Dado** | Que o usuário está na página inicial |
| **Quando** | Ele digita um termo parcial (ex: "T-Shirt") na barra de pesquisa |
| **E** | Clica no botão "Pesquisar" |
| **Então** | A página de resultados deve ser exibida |
| **E** | Todos os produtos que contêm "T-Shirt" no nome devem ser listados |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-PESQ-003 | **Pesquisa por Termo Inexistente** |
| **Dado** | Que o usuário está na página inicial |
| **Quando** | Ele digita um termo que não corresponde a nenhum produto (ex: "Notebook Gamer") na barra de pesquisa |
| **E** | Clica no botão "Pesquisar" |
| **Então** | A página de resultados deve ser exibida |
| **E** | O sistema deve exibir a mensagem "Nenhum produto encontrado" |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-PESQ-004 | **Visualização Detalhada do Produto** |
| **Dado** | Que o usuário está na página de resultados da pesquisa |
| **Quando** | Ele clica no nome ou imagem de um produto (ex: "Men T-Shirt") |
| **Então** | O usuário deve ser redirecionado para a página de detalhes do produto |
| **E** | As informações como nome, preço, descrição e opções de tamanho/cor devem ser exibidas corretamente |

## 3. Adição de Itens ao Carrinho de Compras

**Feature:** Adição e Gestão de Itens no Carrinho

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CARR-001 | **Adicionar Produto Simples ao Carrinho** |
| **Dado** | Que o usuário está na página de detalhes do produto "Blue Top" |
| **Quando** | Ele define a quantidade como 1 |
| **E** | Clica no botão "Adicionar ao Carrinho" |
| **Então** | O sistema deve exibir uma notificação de sucesso "Produto adicionado ao carrinho" |
| **E** | O ícone do carrinho deve mostrar o número 1 |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CARR-002 | **Adicionar Múltiplas Unidades do Mesmo Produto** |
| **Dado** | Que o usuário está na página de detalhes do produto "Men T-Shirt" |
| **Quando** | Ele define a quantidade como 3 |
| **E** | Clica no botão "Adicionar ao Carrinho" |
| **E** | Acessa a página do carrinho |
| **Então** | O produto "Men T-Shirt" deve estar listado no carrinho |
| **E** | A quantidade listada para o produto deve ser 3 |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CARR-003 | **Remover Item do Carrinho** |
| **Dado** | Que o carrinho contém o produto "Blue Top" |
| **Quando** | O usuário acessa a página do carrinho |
| **E** | Clica no ícone "X" (remover) ao lado do produto "Blue Top" |
| **Então** | O produto "Blue Top" deve ser removido da lista |
| **E** | O total do carrinho deve ser recalculado |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CARR-004 | **Adicionar Produtos Diferentes ao Carrinho** |
| **Dado** | Que o usuário adicionou o produto "Blue Top" ao carrinho |
| **Quando** | Ele volta para a página inicial |
| **E** | Adiciona o produto "Summer Dress" ao carrinho |
| **E** | Acessa a página do carrinho |
| **Então** | O carrinho deve listar os dois produtos ("Blue Top" e "Summer Dress") |
| **E** | O total do carrinho deve ser a soma dos preços dos dois produtos |

## 4. Finalização da Compra (Checkout)

**Feature:** Finalização da Compra

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CHECK-001 | **Finalização de Compra Bem-Sucedida (Usuário Logado)** |
| **Dado** | Que o usuário está logado |
| **E** | Que o carrinho contém produtos |
| **Quando** | Ele clica no botão "Finalizar Compra" |
| **E** | Preenche os dados de pagamento (cartão de crédito) com informações válidas |
| **E** | Clica no botão "Pagar e Finalizar" |
| **Então** | O sistema deve exibir a mensagem de sucesso "Seu pedido foi realizado com sucesso!" |
| **E** | O carrinho deve ser esvaziado |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CHECK-002 | **Tentativa de Finalização de Compra (Usuário Não Logado)** |
| **Dado** | Que o usuário não está logado |
| **E** | Que o carrinho contém produtos |
| **Quando** | Ele clica no botão "Finalizar Compra" |
| **Então** | O sistema deve redirecionar o usuário para a página de Login/Registro |
| **E** | O carrinho deve manter os produtos após o login |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CHECK-003 | **Finalização de Compra com Carrinho Vazio** |
| **Dado** | Que o usuário está logado |
| **E** | Que o carrinho está vazio |
| **Quando** | Ele tenta acessar a página de Checkout diretamente pela URL |
| **Então** | O sistema deve redirecionar o usuário para a página inicial ou exibir uma mensagem "Seu carrinho está vazio" |

| ID do Caso | Cenário |
| :--- | :--- |
| CT-CHECK-004 | **Tentativa de Pagamento com Cartão de Crédito Expirado** |
| **Dado** | Que o usuário está na página de pagamento |
| **E** | Que o carrinho contém produtos |
| **Quando** | Ele preenche os dados de pagamento, mas insere uma data de validade expirada |
| **E** | Clica no botão "Pagar e Finalizar" |
| **Então** | O sistema deve exibir uma mensagem de erro "Cartão de crédito expirado" |
| **E** | O usuário deve permanecer na página de pagamento |
