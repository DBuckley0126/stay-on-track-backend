if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const path = require("path");

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  test: {
    client: "pg",
    connection: process.env.KNEX_TEST_DATABASE_CONNECTION,
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/test")
    }
  },
  development: {
    client: "pg",
    connection: process.env.KNEX_DEVELOPMENT_DATABASE_CONNECTION,
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/development")
    }
  },
  production: {
    client: "pg",
    connection: process.env.KNEX_PRODUCTION_DATABASE_CONNECTION,
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/development")
    }
  },
};
