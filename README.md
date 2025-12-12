# Development documentation

## Roadmap

To not forget:
- tests
- handle products codeSecret property privacy
- error management


## Services

ProductService:
- getClientId
- getScope
- getRedirectUri
- enableProduct		-> bb-server
- disableProduct

UserService:
- createUser
- updateUser
- deleteUser

SpotifyDataService:
- getSpotifyId

ScriptService:
- runScriptForAllUsers

BigBrotherService:
- runScript		-> bb-script
- configureProduct

## Controllers

UsersController		/users
ProductsController	/products/{product}

## Environment variables

`.env`:

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
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