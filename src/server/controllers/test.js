const testQueries = require("../db/queries/testQueries");

module.exports = {
  getAllTestValues: async ctx => {
    try {
      const testValues = await testQueries.getAllTestValues();

      ctx.body = {
        status: "success",
        message: "Successfully got test values from database",
        data: testValues
      };
    } catch (err) {
      ctx.throw(400, "Failed to get test values from database");
    }
  },
  postTestValue: async ctx => {
    try {
      const testValue = await testQueries.addTestValue(ctx.query.value);
      ctx.body = {
        status: "success",
        message: "Successfully added test value to database",
        data: testValue
      };
    } catch (err) {
      ctx.throw(400, "Failed to add test value to database", err);
    }
  }
};
