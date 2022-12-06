import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.PRODUCTS, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('title',150).notNullable();
    table.string('synopsis', 255).notNullable();
    table.string('author',100).notNullable();
    table.string('cover', 300).notNullable();
    table.string('category', 100).notNullable();
    table.string('language', 20).notNullable();
    table.string('publisher', 30).notNullable();
    table.integer('pages').notNullable();
    table.integer('isbn').notNullable();
    table.integer('stock').notNullable();

    table.boolean('available').notNullable().defaultTo(true);

    table.double('price', 10,2 ).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.PRODUCTS} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.PRODUCTS).then(() => console.log(`Table ${ETableNames.PRODUCTS} dropped`));
}
