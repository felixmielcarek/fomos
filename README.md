# Development documentation

## Architecture diagram

```mermaid
flowchart TD
    A -->|UsersService| F

    E -->|ProductsService| B
    E -->|UsersProductsService| G

    D -->|ProductsService| B
    D -->|SpotifyUtilsService| E
    D -->|UsersProductsService| G

    A[AuthModule]
    B[ProductsModule]
    D[ScriptsModule]
    E[SpotifyUtilsModule]
    F[UsersModule]
    G[UsersProductsModule]
```

## Environment variables

`.env`:

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=
```

# Technical documentation

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
