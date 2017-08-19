exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').notNullable().primary();
    t.string('display_name', 50).notNullable();
    t.string('username', 24).notNullable().unique();
    t.string('email', 255).notNullable().unique();
    t.boolean('active').notNullable();
    t.string('account_type').nullable();
    t.timestamp('last_login').nullable();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.string('password_hash').notNullable();
    t.string('provider').notNullable();
    t.string('profile_image').nullable();
    t.boolean('verified').notNullable().defaultTo(false);
    t.string('gender').nullable();
    t.string('cover_photo').nullable();
    t.string('first_name').nullable();
    t.string('last_name').nullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};

/* Columns to add

--------------------------------------------
provider √
--------------------------------------------
image √
--------------------------------------------
verified √
--------------------------------------------
age ??? how to add min max?
--------------------------------------------
gender √
--------------------------------------------
cover √
--------------------------------------------
first_name √
--------------------------------------------
last_name √


*/
