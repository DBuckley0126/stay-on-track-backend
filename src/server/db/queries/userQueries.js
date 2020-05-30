const knex = require("../connection");

const getUser = user => {
  return knex("users")
    .where({ email: user.email })
    .select("*")
    .then(result => result[0]);
};

const updateUser = user => {
  return knex("users")
    .where({ email: user.email })
    .update({
      givenName: user.givenName,
      familyName: user.familyName,
      nickname: user.nickname,
      name: user.name,
      picture: user.picture,
      locale: user.locale,
      emailVerified: user.emailVerified,
      sub: user.sub
    })
    .returning([
      "givenName",
      "familyName",
      "nickname",
      "name",
      "picture",
      "locale",
      "emailVerified",
      "sub"
    ])
    .then(result => result[0]);
};

const postUser = user => {
  knex("users")
    .insert({
      email: user.email,
      givenName: user.given_name,
      familyName: user.family_name,
      nickname: user.nickname,
      name: user.name,
      picture: user.picture,
      locale: user.locale,
      emailVerified: user.email_verified,
      sub: user.sub
    })
    .returning([
      "givenName",
      "familyName",
      "nickname",
      "name",
      "picture",
      "locale",
      "emailVerified",
      "sub"
    ])
    .then(result => result[0]);
};

module.exports = {
  getUser,
  postUser,
  updateUser
};
