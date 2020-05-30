exports.up = function(knex, Promise) {
  knex.schema.createTable("users", table => {
    table.unique("email").notNullable();
    table.string("givenName");
    table.string("familyName");
    table.string("nickname");
    table.string("name");
    table.string("picture");
    table.string("locale");
    table.boolean("emailVerified").notNullable();
    table.string("sub").notNullable();
    table.unique("JWT").notNullable();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable("users");
