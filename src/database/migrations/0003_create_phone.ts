import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.PHONES, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('number', 13).notNullable();

    table
      .bigInteger('customer_id')
      .unsigned()

    table
      .foreign('customer_id')
      .references(`${ETableNames.CUSTOMERS}.id`)

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.PHONES} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.PHONES).then(() => console.log(`Table ${ETableNames.PHONES} dropped`));
}
