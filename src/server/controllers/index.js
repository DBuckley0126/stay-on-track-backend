module.exports = {
  index: async ctx => {
    ctx.body = {
      status: "success",
      message: "Hello, world!",
      data: {}
    };
  }
}