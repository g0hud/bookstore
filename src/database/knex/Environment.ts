import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..','..','..','dev.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname,  '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname,  'seeds'),
  },
  pool: {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

export const test: Knex.Config = {
  ...development,
  connection: ':memory:'
};

export const production: Knex.Config = {
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  pool: {
    min: 2,
    max: 10,
  },
};
