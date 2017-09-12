exports.up = (knex) => {
  return knex.schema.createTable('genres', (t) => {
    t
      .increments('id')
      .notNullable()
      .primary();
    t.string('name', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('genres');
};
