import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.USERS, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  }).then(() => console.log(`Table ${ETableNames.USERS} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.USERS).then(() => console.log(`Table ${ETableNames.USERS} dropped`));
}
