exports.up = (knex) => {
  return knex.schema.alterTable('users', (t) => {
    t.timestamp('last_login').nullable().alter();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).alter();
  });
};

exports.down = (knex) => {
  return knex.schema.alterTable('users', (t) => {
    t.timestamp('last_login').notNullable().alter();
    t.timestamp('created_at').nullable().defaultTo(knex.fn.now()).alter();
  });
};
