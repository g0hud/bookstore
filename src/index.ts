import { Knex } from './database/knex';
import { server } from './Server';

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Rodando migrations');

  Knex.migrate.latest().then(() => {
    console.log('Migrations rodadas com sucesso');
    startServer();
  });
} else {
  startServer();
}
