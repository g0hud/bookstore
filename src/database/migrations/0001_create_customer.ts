import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.CUSTOMERS, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('cpf', 11).checkLength('=',11).notNullable().unique();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.CUSTOMERS} created`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.CUSTOMERS)
    .then(() => {
      console.log(`Table ${ETableNames.CUSTOMERS} dropped`);
    });
}
