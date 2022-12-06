import path from 'path';
import supertest from 'supertest';
import { Knex } from '../src/database/knex';

import { server } from '../src/Server';

beforeAll(async () => {
  await Knex.migrate.latest({
    directory: path.resolve(__dirname, '..', 'src', 'database', 'migrations'),
  });
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);

