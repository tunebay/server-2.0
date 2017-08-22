exports.up = (knex) => {
  return knex.schema.createTable('socials', (t) => {
    t.increments('id').notNullable().primary();
    t.integer('user_id').unsigned();
    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('social_id').notNullable();
    t.string('provider').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('socials');
};
