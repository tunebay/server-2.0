exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').notNullable().primary();
    t.string('display_name', 50).notNullable();
    t.string('username', 24).notNullable().unique();
    t.string('email', 255).notNullable().unique();
    t.boolean('active').notNullable();
    t.string('account_type').nullable();
    t.timestamp('last_login').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.string('password_hash').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
