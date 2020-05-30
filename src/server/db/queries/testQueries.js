const knex = require("../connection");

const getAllTestValues = () => {
  return knex("test_values").select("*");
};

const getSingleTestValue = id => {
  return knex("test_values")
    .where({ id: parseInt(id, 10) })
    .select('integer');
};

const addTestValue = testValue => {
  if(!testValue){
    throw new Error("ERROR: Invalid value attempted to be added to database");
  }
  return knex("test_values")
    .insert({ integer: testValue })
    .returning(["id", "integer"]);
};

module.exports = {
  getAllTestValues,
  getSingleTestValue,
  addTestValue
};
