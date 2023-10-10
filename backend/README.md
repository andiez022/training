# Forum Bulletin Board API

## Overview

Backend for Forum Bulletin Board

## Prepare Environment

We recommend using Python version 3.10 or later
</br>
Create .env file and prepare all env variables

```
  cp example.env .env
```

Modify the `sqlalchemy.url` field of the `alembic.init` file with your database environment variables, following the `example.alembic.ini` file, like:

```
  sqlalchemy.url = postgresql://postgres:postgres@postgres:5432/bulletin
```

## Start without Docker

```
  sh setup.sh
```

## Start with Docker (Recommended use for Production)

```
  docker-compose up --build -d
```

## Migrations

### Create migrations

```
  alembic revision -m {file-name}
```

### Run migrations

```
  alembic upgrade head
```

### Undo

```
  alembic downgrade -1
  # 1 is number of latest migrations you want to undo or downgrade
```

## Project structure

````
.
├── app
|    ├── assets
|    ├── common
|    |     ├── email-template
|    |     ├── errors
|    |     ├── helpers
|    |     ├── lib
|    |     ├── repositories
|    |     ├── models
|    |     └── ```
|    ├── middlewares
|    |     ├── authentication.ts
|    |     └── ```
|    ├── migrations
|    |     ├── ${timestamp}-${file-name}.js
|    |     └── ```
|    ├── repositories
|    ├── routes
|    ├── services
|    ├── models
|    ├── controllers
|    ├── validators
|    └── ```
|    ├── seeders
|    |     ├── ${timestamp}-${file-name}.js
|    |     └── ```
|    ├── typings
|    |     └── ```
|    ├── app.ts
|    ├── routes.ts
|    └── index.ts
├── assets
├── database
├── migrations
|    ├── versions
|    |     ├── ${id}_${file-name}.py
|    |     └── ```
|    ├── env.py
|    └── script.py.mako
├── alembic.ini
├── docker-compose.yml
├── Dockerfile
├── README.md
├── requirement.txt
├── setup.sh
└── start.sh
````

## Stay in touch

- Author - Forum Bulletin Board

## License

UNLICENSED.
