exports.up = (knex) => {
  return knex.schema.createTable('playlists_genres', (t) => {
    t.integer('playlist_id').unsigned();
    t.foreign('playlist_id').references('id').inTable('playlists').onDelete('CASCADE');
    t.integer('genre_id').unsigned();
    t.foreign('genre_id').references('id').inTable('genres').onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlists_genres');
};
