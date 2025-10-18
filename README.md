# API de Gerenciamento de Produtos (Desafio Backend)

Este projeto é uma API REST desenvolvida em Node.js com TypeScript, projetada para gerenciar (Criar, Ler, Atualizar, Deletar) produtos. O foco principal é a implementação de boas práticas de arquitetura de software, como a separação de responsabilidades em camadas.

## Funcionalidades
* Criar um novo produto (nome, preço, categoria).
* Listar todos os produtos cadastrados.
* Buscar um único produto pelo seu ID.
* Atualizar um produto existente.
* Remover um produto.

## Tecnologias Principais
* **Node.js (v22+)**: Ambiente de execução.
* **TypeScript**: Superset do JavaScript para tipagem estática.
* **Express.js**: Framework para gerenciamento de rotas e servidor HTTP.
* **Prisma**: ORM (Object-Relational Mapper) para comunicação com o banco de dados.
* **MySQL**: Banco de dados relacional.
* **ES Modules (ESM)**: Sistema de módulos moderno do Node.js.

---

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas (multicamadas) para garantir que o código seja organizado, modular, escalável e fácil de manter. Cada camada tem uma responsabilidade única:

### 1. Camada de DTOs (`src/dtos`)
* **Data Transfer Objects (Objetos de Transferência de Dados)**.

### 2. Camada de Controller (`src/controllers`)
* **Responsabilidade:** Lidar com a requisição HTTP e a resposta.

### 3. Camada de Serviço (`src/services`)
* **Responsabilidade:** Orquestrar a lógica de negócio (as "regras").

### 4. Camada de Model (`src/models`)
* **Responsabilidade:** Acesso e abstração dos dados (falar com o banco).

**Fluxo de uma Requisição (Ex: Criar Produto):**
`Endpoint` → `Controller` → `Service` → `Model` → `Prisma` → `Banco MySQL`

---

## Endpoints Disponíveis

A API utiliza o prefixo base `/api/produtos` para todas as rotas.

| Verbo | Rota | Descrição | Corpo da Requisição (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/produtos` | Cria um novo produto. | `{ "nome": "...", "preco": ..., "categoria": "..." }` |
| `GET` | `/api/produtos` | Lista todos os produtos cadastrados. | (Nenhum) |
| `GET` | `/api/produtos/:id` | Busca um produto específico pelo seu ID. | (Nenhum) |
| `PUT` | `/api/produtos/:id` | Atualiza um produto existente. | `{ "nome": "...", "preco": ..., "categoria": "..." }` 

## Guia de Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Pré-requisitos
* Node.js (v18 ou superior, pois usamos o `--watch` nativo).
* Um servidor MySQL rodando localmente (ex: via MySQL Workbench ou Docker).

## 2. Clonar o Repositório
```bash
git clone <url-do-seu-repositorio>
cd api-produtos
```
## 3. Instalar Dependências

* Use o NPM (ou seu gerenciador preferido) para instalar os pacotes do projeto (incluindo Prisma, Express, etc.).*
```bash
npm install
```
## 4. Configurar o Banco de Dados

1.  No seu servidor MySQL, crie um novo banco de dados (schema). Para este projeto, usamos o nome `api_produtos`.
2.  Crie um arquivo chamado `.env` na raiz do projeto.
3.  Adicione sua string de conexão do MySQL ao arquivo `.env`:

    ```ini
    # Substitua 'root' e 'sua_senha' pelo seu usuário e senha do MySQL
    # Garanta que o nome do banco ('api_produtos') esteja correto.
    DATABASE_URL="mysql://root:sua_senha@localhost:3306/api_produtos"
    ```
## 5. Executar as Migrações do Banco

Este comando lê o arquivo `prisma/schema.prisma` e cria todas as tabelas (`Product`) no seu banco MySQL.

```bash
npx prisma migrate dev
```
## 6. Gerar o Prisma Client

Este comando lê seu schema e gera o código TypeScript otimizado para o Prisma (necessário para o `ProductModel` funcionar).

```bash
npx prisma generate
```
## 7. Iniciar o Servidor

Este comando inicia o servidor em modo de desenvolvimento. O servidor usará o `--watch` nativo do Node.js para reiniciar automaticamente sempre que você salvar um arquivo `.ts`.

```bash
npm run dev
```
## 8. Testar os Endpoints

Com o servidor rodando (após a Etapa 7), você pode usar uma ferramenta de cliente API, como o **Postman**, **Insomnia** ou **Bruno**, para fazer requisições e testar a API.

---
### Exemplo: Criar um Produto (POST)

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/produtos`
* **Body (JSON):**

    ```json
    {
      "nome": "Mouse Gamer Pro",
      "preco": 249.90,
      "categoria": "Periféricos"
    }
    ```
* **Resposta (Exemplo):**
    ```json
    {
      "id": "clxmrqg9p0000unl4a9p233l4",
      "nome": "Mouse Gamer Pro",
      "preco": 249.9,
      "categoria": "Periféricos",
      "createdAt": "2025-10-17T23:30:00.000Z",
      "updatedAt": "2025-10-17T23:30:00.000Z"
    }
    ```
---
### Exemplo: Listar todos os Produtos (GET)

* **Método:** `GET`
* **URL:** `http://localhost:3000/api/produtos`
* **Resposta (Exemplo):**
    ```json
    [
      {
        "id": "clxmrqg9p0000unl4a9p233l4",
        "nome": "Mouse Gamer Pro",
        "preco": 249.9,
        "categoria": "Periféricos",
        "createdAt": "2025-10-17T23:30:00.000Z",
        "updatedAt": "2025-10-17T23:30:00.000Z"
      }
    ]
    ```
---
### Outros Endpoints (use o `id` de um produto criado)

* **Buscar por ID:** `GET http://localhost:3000/api/produtos/<seu-id-aqui>`
* **Atualizar:** `PUT http://localhost:3000/api/produtos/<seu-id-aqui>` (envie um JSON com os campos que deseja mudar)
* **Deletar:** `DELETE http://localhost:3000/api/produtos/<seu-id-aqui>`
