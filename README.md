## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

To run and see how this whole Node/Express application working, we need to prepare a few things. First, make sure MySQL/MariaDB is running then you can export the initial data for Role and Permissions. You can find the SQL file in the SQL folder.

Next, run the Node application

Open the Postman application to check or test each endpoint. Don't worry, you can import the Postman collections in the postman folder. Next, you can start test using postman collection started by signup for a new user, sign in, add the token to the environment variables, then you can test the rest of the secured and permissions-based endpoints.
