exports.up = (knex, Promise) =>
  knex.schema.createTable("users", table => {
    table.string("email");
    table.unique("email");
    table.string("givenName");
    table.string("familyName");
    table.string("nickname");
    table.string("name");
    table.string("picture");
    table.string("locale");
    table.boolean("emailVerified").notNullable();
    table.string("sub").notNullable();
  });

exports.down = (knex, Promise) => knex.schema.dropTable("users");
