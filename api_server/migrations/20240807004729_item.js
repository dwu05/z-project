/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments('id');
    table.integer('userId')
    table.foreign('userId').references(`users.id`);
    table.text('itemName');
    table.text('description');
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('userId')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('item');
  });
};
