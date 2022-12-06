# API BookStore

Esta API usa [Node.js](https://nodejs.org/en/), para executar os testes ou em modo Desenvolvimento certifique-se que possui instalado em sua máquina.

## Instalação

Para baixar a API deverá seguir as instruções abaixo:

```bash
  git clone https://github.com/gomeshud/bookstore.git
  cd bookstore
```

## Referências da API

URL:
```
 http://localhost:8082
```

## Rotas do Usuário

### Cadastrar um novo Usuário

```http
  POST /user
```
| Parâmetro    | Tipo     | Descrição                           |
| :----------- | :------- | :---------------------------------- |
| `Name` | `string` | **Requirido** Nome do usuário  |
| `Email` | `string` | **Requirido** Email do usuário  |
| `Password` | `string` | **Requirido** Senha do usuário  |

```
{
	"name": "Nome do Usuário",
	"email": "admin@example.com",
	"password":"admin123"
}
```

### Login do usuário

```http
  POST /login
```
| Parâmetro    | Tipo     | Descrição                           |
| :----------- | :------- | :---------------------------------- |
| `Email` | `string` | **Requirido** Email do usuário  |
| `Password` | `string` | **Requirido** Senha do usuário  |
```
{
	"email": "admin@example.com",
	"password":"admin123"
}
```

Será retornado o objeto abaixo, o valor deverá ser adicionado no Bearer em todas as demais requisições

```
{
  accessToken: "TOKEN_DE_AUTENTICAÇÃO"
}
```

## Rotas de Cliente

#### Buscar todos os clientes cadastrados

```http
  GET /customers
```

#### Buscar cliente pelo CPF

```http
  GET /customer/${CPF}
```
| Parâmetro    | Tipo     | Descrição                           |
| :----------- | :------- | :---------------------------------- |
| `CPF` | `string` | **Requirido** CPF do cliente  |

#### Inserir novo cliente

```http
  POST /customers
```
| Parâmetro    | Tipo     | Descrição                           |
| :----------- | :------- | :---------------------------------- |
|    `NAME`    | `string` | **Requirido** Nome do Cliente         |
|    `EMAIL`   | `string` | **Requirido** Email do Cliente        |
|     `CPF`    | `string` | **Requirido** CPF do Cliente          |
|  `ZIP_CODE`  | `string` | **Requirido** CEP do Cliente          |
|  `NUMBER`    | `string` | **Requirido** Número da residência    |
|  `COMPLEMENT`| `string` | **Requirido** Complemento do Endereço |
|  `NUMBER`    | `string` | **Requirido** Número de telefone      |

```
{
	"customer":{
		"name": "Nome do Cliente",
		"email": "cliente@example.com",
		"cpf": "12312312566"
	},
	"address":{
		"zip_code": "01001-000",
		"number": "101",
		"complement": "Bloco X, Apto Y"
	},
	"phone": {
		"number": "0011988887777"
	}
}
```

## Rotas de Produto

### Criar um produto
```http
  POST /product
```
| Parâmetro    | Tipo     | Descrição                           |
| :----------- | :------- | :---------------------------------- |
| `Title` | `string` | **Requirido** Título |
| `Synopsis` | `string` | **Requirido** Sinopse |
| `Author` | `string` | **Requirido** Autor |
| `Cover` | `string` | **Requirido** URL da capa |
| `Category` | `string` | **Requirido** Categoria |
| `Language` | `string` | **Requirido** Língua |
| `Publisher` | `string` | **Requirido** Editora |
| `Pages` | `number` | **Requirido** Número de páginas  |
| `ISBN` | `string` | **Requirido** ISBN |
| `Stock` | `number` | **Requirido** Quantidade em stock  |
| `Price` | `string(double)` | **Requirido** Preço |
| `Available` | `boolean` | **Requirido** Disponibilidade  |

```
{
	"title": "Livro 1",
	"synopsis": "Sinopse do livro",
	"author": "Quem escreveu",
	"cover": "https://urldacapa.com.br/?livro=1",
	"category": "Ficção",
	"language": "PT-BR",
	"publisher": "Editora",
	"pages": 100,
	"isbn": "978-3-16-148410-0",
	"stock": 1000,
	"price": "10,50",
	"available": true
}
```

## Variáveis de ambiente

Será necessário alterar o arquivo .env.example para .env e preencher seguindo as instruções abaixo

`JWT_SECRET`: Será necessário gerar um código antes de executar a API.

## Como executar

Para executar as APIs, deve-se entrar e usar o comando a seguir:

### Produção
```bash
  $ docker-compose up --build
```

### Desenvolvimento
```bash
  npm i
  npm run dev
```
### Teste
```bash
  npm i
  npm run test
```

## Especificações técnicas

**Servidor:** Node.js, Express.js

**ORM** Knex

**Banco de dados:** MySQL

## Autor

- [@gomesHud](https://www.github.com/gomeshud)
