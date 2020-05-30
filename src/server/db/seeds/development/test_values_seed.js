exports.seed = (knex, Promise) => {
  return knex("test_values")
    .delete()
    .then(() =>
      knex("test_values").insert({
        integer: 10
      })
    )
    .then(() =>
      knex("test_values").insert({
        integer: 15
      })
    )
    .then(() =>
      knex("test_values").insert({
        integer: 100
      })
    );
};
