
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(() => {
      // Inserts seed entries
      return knex('genres').insert([
        { id: 1, name: 'Alternative' },
        { id: 2, name: 'Bashment' },
        { id: 3, name: 'Blues' },
        { id: 4, name: 'Classical' },
        { id: 5, name: 'Country' },
        { id: 6, name: 'Dance & EDM' },
        { id: 7, name: 'Dancehall' },
        { id: 8, name: 'Deep House' },
        { id: 9, name: 'Disco' },
        { id: 10, name: 'Drum & Bass' },
        { id: 11, name: 'Dupstep' },
        { id: 12, name: 'Electronic' },
        { id: 13, name: 'Folk' },
        { id: 14, name: 'Funk' },
        { id: 15, name: 'Garage' },
        { id: 16, name: 'Gospel' },
        { id: 17, name: 'Grime' },
        { id: 18, name: 'Hip-Hop' },
        { id: 19, name: 'House' },
        { id: 20, name: 'Indie' },
        { id: 21, name: 'Instrumental' },
        { id: 22, name: 'Jazz' },
        { id: 23, name: 'Latin' },
        { id: 24, name: 'Metal' },
        { id: 25, name: 'Other' },
        { id: 26, name: 'Pop' },
        { id: 27, name: 'R&B' },
        { id: 28, name: 'Rap' },
        { id: 29, name: 'Reggae' },
        { id: 30, name: 'Reggaeton' },
        { id: 31, name: 'Rock' },
        { id: 32, name: 'Singer/Songwriter' },
        { id: 33, name: 'Ska' },
        { id: 34, name: 'Soul' },
        { id: 35, name: 'Soundtrack' },
        { id: 36, name: 'Techno' },
        { id: 37, name: 'Trance' },
        { id: 38, name: 'Trap' },
        { id: 39, name: 'Triphop' },
        { id: 40, name: 'World' }
      ]);
    });
};
