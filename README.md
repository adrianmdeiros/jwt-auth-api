# 🔐 jwt-auth-api-example

<a href="https://opensource.org/license/mit/" target="_blank">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000" >
</a>

<br/>
<br/>

API de autenticação JWT feita com TypeScript e Prisma ORM

## Como usar

Clone o repositório:

```console
git clone https://github.com/adrianmedeirosdev/jwt-auth-api-exemple.git
```

<br>

O docker compose irá subir os containers da aplicação Node e banco de dados postgreSQL:

```console
docker compose up -d
```

<br>

## Endpoints

POST /api/users

_Request_

```json
{
    "email": "email@example.com",
    "password": "senha_secreta"
}
```

_Response_

```json
{
    "id": "d06ef51a-1dbb-464b-ae64-bd0263eef1b6",
    "email": "email@example.com"
}
```

<br/>

POST /api/auth

_Request_

```json
{
    "email": "email@example.com",
    "password": "senha_secreta"
}
```

_Response_

```json
{
    "user": {
        "id": "d06ef51a-1dbb-464b-ae64-bd0263eef1b6"
        "email": "email@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2MmRkYTU2LWY2MDgtNDk5Zi05Y2M3LTIxZmM2MjRmOTY1OSIsImlhdCI6MTcxMzkyNTA0NywiZXhwIjoxNzE0MDExNDQ3fQ.xBiNAfMJrjk9tpicpIYr4Y7wdD93d2RlZRFT3W5m9dw"
}
```

<br/>

GET /api/users 🔒

_Request_

```javascript
// Exemplo com JavaScript

const response = await fetch('/api/users', {
    headers: {
        'Content-Type': 'application/json'
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2MmRkYTU2LWY2MDgtNDk5Zi05Y2M3LTIxZmM2MjRmOTY1OSIsImlhdCI6MTcxMzkyNTA0NywiZXhwIjoxNzE0MDExNDQ3fQ.xBiNAfMJrjk9tpicpIYr4Y7wdD93d2RlZRFT3W5m9dw'
    }
})
```

_Response_

```json
{
    "message": "You are allowed to see this only because you have a token"
}"
```

### 🚀 Technologias

Esse projeto foi desenvolvido com essas tecnologias:

- TypeScript, Node.js, Express.js e Prisma ORM
- Git and Github
- bcryptjs, jsonwebtoken, vitest, cors, http-status-codes, tsx e tsup

### ⚖ License

<p> Este projeto está sobre <a href="https://opensource.org/license/mit/" target="_blank">The MIT License</a> </p>
