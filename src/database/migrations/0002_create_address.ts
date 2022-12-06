import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.ADDRESS, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('street', 50).notNullable();
    table.string('number', 10).notNullable();
    table.string('complement', 100).notNullable();
    table.string('neighborhood', 30).notNullable();
    table.string('city', 30).notNullable();
    table.string('state', 20).notNullable();
    table.string('country', 10).notNullable().defaultTo('Brasil');
    table.string('zip_code',8).notNullable();

    table
      .bigInteger('customer_id')
      .unsigned()

    table
      .foreign('customer_id')
      .references(`${ETableNames.CUSTOMERS}.id`)

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.ADDRESS} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.ADDRESS).then(() => console.log(`Table ${ETableNames.ADDRESS} dropped`));
}
