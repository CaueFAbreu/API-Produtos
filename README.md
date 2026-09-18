# 📦 API de Gerenciamento de Produtos

![Node.js](https://img.shields.io/badge/Node.js-v22%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Testes-C21325?logo=jest&logoColor=white)

API REST desenvolvida em **Node.js** com **TypeScript**, para gerenciar produtos (criar, listar, buscar, atualizar e remover). O foco do projeto é a aplicação de boas práticas de arquitetura de software, com clara separação de responsabilidades em camadas.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias Principais](#tecnologias-principais)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [Guia de Instalação e Execução](#guia-de-instalação-e-execução)
- [Executando os Testes](#executando-os-testes)
- [Exemplos de Uso](#exemplos-de-uso)

## Funcionalidades

- Criar um novo produto (nome, preço, categoria).
- Listar todos os produtos cadastrados.
- Buscar um único produto pelo seu ID.
- Atualizar um produto existente.
- Remover um produto.

## Tecnologias Principais

| Tecnologia | Finalidade |
|---|---|
| **Node.js (v22+)** | Ambiente de execução |
| **TypeScript** | Tipagem estática sobre o JavaScript |
| **Express.js** | Gerenciamento de rotas e servidor HTTP |
| **Prisma** | ORM para comunicação com o banco de dados |
| **MySQL** | Banco de dados relacional |
| **ES Modules (ESM)** | Sistema de módulos moderno do Node.js |
| **Jest** | Testes automatizados (cobertura da camada de Services) |

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas para garantir código organizado, modular, escalável e fácil de manter:

| Camada | Local | Responsabilidade |
|---|---|---|
| DTOs | `src/dtos` | Data Transfer Objects — formato dos dados trafegados |
| Controller | `src/controllers` | Lida com a requisição HTTP e a resposta |
| Service | `src/services` | Orquestra a lógica de negócio (as regras) |
| Model | `src/models` | Acesso e abstração dos dados (comunicação com o banco) |

**Fluxo de uma requisição** (ex.: criar produto):

```
Endpoint → Controller → Service → Model → Prisma → Banco MySQL
```

## Endpoints Disponíveis

Todas as rotas usam o prefixo base `/api/produtos`.

| Verbo | Rota | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| `POST` | `/api/produtos` | Cria um novo produto | `{ "nome": "...", "preco": ..., "categoria": "..." }` |
| `GET` | `/api/produtos` | Lista todos os produtos cadastrados | — |
| `GET` | `/api/produtos/:id` | Busca um produto específico pelo ID | — |
| `PUT` | `/api/produtos/:id` | Atualiza um produto existente | `{ "nome": "...", "preco": ..., "categoria": "..." }` |
| `DELETE` | `/api/produtos/:id` | Remove um produto existente | — |

## Guia de Instalação e Execução

### 1. Pré-requisitos

- Node.js v18 ou superior (o projeto usa o `--watch` nativo).
- Um servidor MySQL rodando localmente (via MySQL Workbench, Docker etc.).

### 2. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd api-produtos
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar o banco de dados

1. No seu servidor MySQL, crie um banco de dados (schema) — neste projeto, usamos o nome `api_produtos`.
2. Crie um arquivo `.env` na raiz do projeto.
3. Adicione sua string de conexão do MySQL:

```env
# Substitua 'root' e 'sua_senha' pelo seu usuário e senha do MySQL
# Garanta que o nome do banco ('api_produtos') esteja correto.
DATABASE_URL="mysql://root:sua_senha@localhost:3306/api_produtos"
```

### 5. Executar as migrações do banco

```bash
npx prisma migrate dev
```

### 6. Gerar o Prisma Client

```bash
npx prisma generate
```

### 7. Iniciar o servidor

```bash
npm run dev
```

O servidor usa o `--watch` nativo do Node.js, reiniciando automaticamente a cada alteração salva em um arquivo `.ts`.

### 8. Testar os endpoints

Com o servidor rodando, use um cliente HTTP como **Postman**, **Insomnia** ou **Bruno** para fazer as requisições.

## Executando os Testes

O projeto conta com testes unitários (Jest) cobrindo a camada de Services, com o `ProductModel` mockado — ou seja, não é necessário ter o banco de dados rodando para executá-los.

```bash
npm test
```

## Exemplos de Uso

### Criar um produto — `POST /api/produtos`

**Body:**

```json
{
  "nome": "Mouse Gamer Pro",
  "preco": 249.90,
  "categoria": "Periféricos"
}
```

**Resposta:**

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

### Listar todos os produtos — `GET /api/produtos`

**Resposta:**

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

### Outros endpoints

Use o `id` de um produto já criado:

- **Buscar por ID:** `GET http://localhost:3000/api/produtos/<seu-id-aqui>`
- **Atualizar:** `PUT http://localhost:3000/api/produtos/<seu-id-aqui>` (envie um JSON com os campos que deseja alterar)
- **Deletar:** `DELETE http://localhost:3000/api/produtos/<seu-id-aqui>`
