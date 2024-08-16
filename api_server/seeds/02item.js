/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, userId: 1, itemName: 'shield', description: `america's shield`, quantity: 1},
    {id: 2, userId: 2, itemName: 'nano suit', description: `nanotech ironman suit`, quantity: 1},
    {id: 3, userId: 2, itemName: 'hand repulsor', description: `laser hand repulsors`, quantity: 2},
    {id: 4, userId: 3, itemName: 'hulk pants', description: `indestructible hulk pants`, quantity: 25},
  ]);
};
