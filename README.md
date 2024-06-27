# CHOWDECK

This project is a small RESTful API for a restaurant management product called
Kitchen

## Frameworks and Technologies

The services are written in [Node](https://nodejs.org/en).


## Running a service

Setup the repo root [`.env`](./.env) file.

```bash
cp .env.example .env
```

Install npm dependencies. Use the version of node specified in
[`.nvmrc`](./.nvmrc).

```bash
npm install
```


Setup the database (migration)
Install Postgress DB on your machine

```bash
npx prisma migrate dev --name init
```

```bash
npm run seed
```


Run the service

```bash
npm run dev
```

