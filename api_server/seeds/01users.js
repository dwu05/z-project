/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstName: 'Steve', lastName: 'Rogers', username: 'captamerica', password: 'blue'},
    {id: 2, firstName: 'Tony', lastName: 'Stark', username: 'ironman', password: 'red'},
    {id: 3, firstName: 'Bruce', lastName: 'Banner', username: 'hulk', password: 'green'},
  ]);
};
