exports.up = (knex) => {
  return knex.schema.createTable('playlists', (t) => {
    t
      .increments('id')
      .notNullable()
      .primary();
    t.integer('user_id').unsigned();
    t
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.string('title', 100).notNullable();
    t.string('playlist_type', 24).notNullable();
    t.float('price', 5, 2).notNullable();
    t.integer('number_of_tracks').notNullable();
    t.integer('duration').notNullable();
    t.boolean('can_pay_more').notNullable();
    t
      .string('permalink')
      .notNullable()
      .unique();
    t.string('artwork').nullable();
    t.string('purchase_message', 255).nullable();
    t.timestamp('release_date').nullable();
    t
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlists');
};
