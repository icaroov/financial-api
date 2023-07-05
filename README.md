# Simple Financial API

## About the project

- This project is a simple financial API that allows you to create, update, delete and list financial transactions;
- Using NodeJS, Express and TypeScript;
- Using Prisma to connect to a PostgreSQL database;
- Using Jest and Supertest for testing;
- Using ESLint and Prettier for code formatting;
- Authentication using JWT;

## Functionalities

- Create a new user;
- Authenticate a user;
- Create and list credit cards;
- Create and list users accounts;
- Perform and list transactions on an account;
- Consult the balance of an account;
- Revert a transaction.

## How to run the project

You can test the API using the following link: [Financial API](https://financial-api-6kb8.onrender.com) or follow the steps below to run the project locally.

### Insomnia workspace

Also in the project root directory there is a file called `insomnia.json` with the Insomnia workspace containing all the requests to test the API.

### Running the project locally

- Clone the repository:

```bash
git clone git@github.com:icaroov/financial-api.git
cd financial-api
```

- Install the dependencies:

```bash
npm install
```

- Create a PostgreSQL database, you can use Docker. Run the following command in the project root directory:

```bash
docker compose up -d
```

The database will be available on port 5432.

- Run the migrations:

```bash
npx prisma migrate dev
```

- Create a `.env` file based on the `.env.example` file and fill in the variables with your data:

```bash
cp .env.example .env
```

- Run the project in development mode:

```bash
npm run dev
```

- Run the tests:

```bash
npm run test
```

## Endpoints documentation

Endpoints documentation is available at [here](https://git.cubos.io/cubos/desafios-tecnicos/pessoa-backend-pleno/-/blob/main/endpoints/endpoints.md).
