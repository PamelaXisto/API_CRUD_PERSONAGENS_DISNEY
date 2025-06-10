# 🐭 API de Personagens Disney

Este projeto oferece uma **API RESTful** para gerenciar informações sobre personagens da Disney. Ele permite que você execute as operações **CRUD** (Criar, Ler, Atualizar, Excluir) mais comuns em dados de personagens.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**: Um ambiente de execução JavaScript construído sobre o motor V8 do Chrome.
* **Express.js**: Um framework web rápido, não opinativo e minimalista para Node.js.
* **CORS**: Middleware para habilitar o Compartilhamento de Recursos de Origem Cruzada (Cross-Origin Resource Sharing).
* **Body-parser**: Middleware para analisar corpos de requisição de entrada.
* **Prisma**: Um ORM de próxima geração para Node.js e TypeScript.
* **MySQL**: Um popular sistema de gerenciamento de banco de dados relacional de código aberto (utilizado via Prisma).

---

## 📦 Instalação

Para configurar e executar este projeto localmente, siga estes passos:

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-seu-repositorio>
    cd <pasta-do-seu-repositorio>
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

    As principais dependências são:

    * `@prisma/client`: Cliente Prisma para interação com o banco de dados.
    * `body-parser`: Analisa os corpos das requisições.
    * `cors`: Habilita o CORS.
    * `express`: O framework web para Node.js.
    * `prisma`: CLI e biblioteca principal do Prisma.

3.  **Configure seu banco de dados:**

    Esta API utiliza MySQL com Prisma. Você precisará:

    * Ter um **banco de dados MySQL** em execução.
    * Configurar sua string de conexão com o banco de dados em um arquivo `.env` (ex: `DATABASE_URL="mysql://usuario:senha@host:porta/banco_de_dados"`).
    * Executar as migrações do Prisma para criar a tabela `tbl_personagem`:

    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Inicie a API:**

    ```bash
    node app.js
    ```

    A API estará rodando em `http://localhost:8080`.

---

## 🌐 Endpoints da API

A API oferece os seguintes endpoints para gerenciar os dados dos personagens da Disney:

### Personagens (`/v1/disney/personagem`)

* **`GET /v1/disney/personagem`**
    * **Descrição**: Retorna todos os personagens da Disney.
    * **Resposta**: Um array de objetos de personagens.

* **`GET /v1/disney/personagem/filtro`**
    * **Descrição**: Retorna personagens filtrados por **nome**, **apelido** ou **espécie**.
    * **Parâmetros de Query**:
        * `nome` (opcional): Filtra pelo nome do personagem.
        * `apelido` (opcional): Filtra pelo apelido do personagem.
        * `especie` (opcional): Filtra pela espécie do personagem.
    * **Exemplo**: `GET http://localhost:8080/v1/disney/personagem/filtro?nome=Mickey`

* **`GET /v1/disney/personagem/:id`**
    * **Descrição**: Retorna um único personagem pelo seu **ID exclusivo**.
    * **Parâmetro da URL**: `id` (inteiro) - O ID do personagem.
    * **Exemplo**: `GET http://localhost:8080/v1/disney/personagem/1`

* **`POST /v1/disney/personagem`**
    * **Descrição**: Cria um **novo personagem** da Disney.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "nome": "Nome do Personagem",
            "apelido": "Apelido do Personagem",
            "biografia": "Biografia completa do personagem...",
            "local_nascimento": "Local de nascimento",
            "vestimenta": "Descrição da vestimenta",
            "foto_perfil": "URL da foto de perfil",
            "especie": "Espécie do personagem",
            "nome_criador": "Nome do criador"
        }
        ```
    * **Resposta**: Mensagem de sucesso e código de status `201`.

* **`PUT /v1/disney/personagem/:id`**
    * **Descrição**: **Atualiza** um personagem da Disney existente pelo seu ID.
    * **Parâmetro da URL**: `id` (inteiro) - O ID do personagem a ser atualizado.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "nome": "Novo Nome",
            "apelido": "Novo Apelido",
            "biografia": "Nova biografia...",
            "local_nascimento": "Novo Local",
            "vestimenta": "Nova vestimenta",
            "foto_perfil": "Nova URL da foto",
            "especie": "Nova espécie",
            "nome_criador": "Novo criador"
        }
        ```
    * **Resposta**: Mensagem de sucesso e código de status `200`.

* **`DELETE /v1/disney/personagem/:id`**
    * **Descrição**: **Exclui** um personagem da Disney pelo seu ID.
    * **Parâmetro da URL**: `id` (inteiro) - O ID do personagem a ser excluído.
    * **Exemplo**: `DELETE http://localhost:8080/v1/disney/personagem/1`
    * **Resposta**: Mensagem de sucesso e código de status `200`.

---

## 📂 Estrutura do Projeto

* `app.js`: O ponto de entrada principal da API, configurando rotas e middlewares.
* `/controller`: Contém a lógica de negócios para lidar com as operações relacionadas aos personagens.
    * `controllerPersonagem.js`: Funções para operações CRUD, validação e interação com o DAO.
* `/model/DAO`: Contém os objetos de acesso a dados para interagir com o banco de dados.
    * `personagem.js`: Funções para executar consultas SQL na tabela `tbl_personagem` usando Prisma.
* `/modulo`: Contém arquivos de configuração.
    * `config.js`: Define mensagens de sucesso e erro padrão e seus respectivos códigos de status HTTP.

---

## 🛠️ Desenvolvimento

### Pré-requisitos

* Node.js (versão LTS recomendada)
* Banco de Dados MySQL

---
