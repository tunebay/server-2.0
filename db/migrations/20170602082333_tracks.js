exports.up = (knex) => {
  return knex.schema.createTable('tracks', (t) => {
    t
      .increments('id')
      .notNullable()
      .primary();
    t.integer('playlist_id').unsigned();
    t
      .foreign('playlist_id')
      .references('id')
      .inTable('playlists')
      .onDelete('CASCADE');
    t.string('name', 100).notNullable();
    t.integer('duration').notNullable();
    t.integer('playlist_position').notNullable();
    t.float('price', 5, 2).nullable();
    t.boolean('single').notNullable();
    t.string('file_type').notNullable();
    t.string('location', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('tracks');
};
