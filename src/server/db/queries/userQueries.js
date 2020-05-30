const knex = require("../connection");

const getUser = email => {
  return knex("users")
    .where({ email })
    .select("*");
};

const addUser = user => {
  knex("users")
    .returning([
      "email",
      "givenName",
      "familyName",
      "nickname",
      "name",
      "picture",
      "locale",
      "emailVerified",
      "sub",
      "JWT"
    ])
    .insert({
      email: user.email,
      givenName: user.givenName,
      familyName: user.familyName,
      nickname: user.nickname,
      name: user.name,
      picture: user.picture,
      locale: user.locale,
      emailVerified: user.emailVerified,
      sub: user.sub,
      JWT: user.JWT
    });
};


module.exports = {
  getUser,
  addUser
};
