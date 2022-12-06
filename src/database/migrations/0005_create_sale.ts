import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.SALES, (table) => {
    table.bigIncrements('id').primary().index();

    table.integer('quantity', 2).notNullable();
    table.double('unity_price', 10,2).notNullable();
    table.double('total_price', 10,2).notNullable();

    table
      .bigInteger('customer_id')
      .unsigned()
    table
      .foreign('customer_id')
      .references(`${ETableNames.CUSTOMERS}.id`)

    table
      .bigInteger('product_id')
      .unsigned()
    table
      .foreign('product_id')
      .references(`${ETableNames.PRODUCTS}.id`)

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.SALES} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.SALES).then(() => console.log(`Table ${ETableNames.SALES} dropped`));
}
