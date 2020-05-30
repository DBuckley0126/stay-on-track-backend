const userQueries = require("../db/queries/userQueries");

module.exports = {
  syncUser: async ctx => {
    const foundUser = await userQueries.getUser(ctx.request.body.user);

    if (foundUser) {
      const updatedUser = await userQueries.updateUser(ctx.request.body.user);
      ctx.body = {
        status: "success",
        message: "Successfully synced user",
        data: {
          user: updatedUser,
          persisted: true
        }
      };
    } else {
      const createdUser = await userQueries.postUser(ctx.request.body.user);
      ctx.body = {
        status: "success",
        message: "Successfully created and synced user",
        data: {
          user: createdUser,
          persisted: false
        }
      };
    }
  }
};
