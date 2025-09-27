# My Next.js Project

## Description

This project is a web application developed using the Next.js framework. It includes various Next.js features and applications. The project is integrated with a PostgreSQL database via Docker containers.

## Features

- Next.js 15.x
- React 19.x
- Tailwind CSS (likely)
- PostgreSQL database
- Easy deployment with Docker and Docker Compose
- Database management with Prisma ORM

## Setup

Follow these steps to run the project on your local machine:

### Prerequisites

- Node.js (v20 or higher)
- npm (comes with Node.js)
- Docker Desktop (for Docker Engine and Docker Compose)

### Steps

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd my-project
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create the `.env` file:
    Create a file named `.env` in the root of the `my-project` directory and add the following content:
    ```
    DATABASE_URL="postgres://admin:admin@localhost:5432/fabrika"
    ```

4.  Generate Prisma Client and apply database migrations:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
    _Note: If you encounter an error like `Can't reach database server`, ensure Docker Desktop is running and try the commands in the `Running with Docker` section again._

## Usage

To run the project in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3001`.

To build for production:

```bash
npm run build
npm start
```

## Running with Docker

To run the project via Docker containers:

1.  Navigate to the `my-project` directory.

2.  Start the services using Docker Compose (including the database):
    ```bash
    docker-compose up -d --build
    ```
    Your application will be available at `http://localhost:3001`, and your PostgreSQL database at `localhost:5432`.
    Data will be persisted thanks to the `db_data` volume.

3.  To see running containers:
    ```bash
    docker ps
    ```

4.  To stop and remove containers:
    ```bash
    docker-compose down
    ```

## Database (Prisma)

This project uses [Prisma ORM](https://www.prisma.io/) for database operations. The database schema is defined in the `prisma/schema.prisma` file.

### Adding New Models or Schema Changes

When you add a new model or modify the existing schema, run the following command to create and apply the migration:

```bash
npx prisma migrate dev --name <migration-name>
```

## Development

This project is developed with Next.js, React, and TypeScript. It is styled using Tailwind CSS. The project structure is organized according to Next.js's App Router principles.

## Contributing

If you would like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file (if applicable) for more details.