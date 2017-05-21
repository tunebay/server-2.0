const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/tunebay_test_two',
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/test')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/tunebay_development_two',
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/development')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/production')
    }
  }
};
