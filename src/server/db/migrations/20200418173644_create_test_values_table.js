exports.up = (knex, Promise) =>
  knex.schema.createTable("test_values", table => {
     table.increments();
     table.integer("integer").notNullable();
  });

exports.down = (knex, Promise) => knex.schema.dropTable("test_values");